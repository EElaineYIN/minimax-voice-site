import { NextResponse } from "next/server";

// Force this route to run on the Node.js runtime so we can use fetch with
// reasonable timeouts and access env vars at request time.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FEISHU_BASE = "https://open.feishu.cn/open-apis";
const APP_TOKEN = "IocFbYtana4UVfsqWgAc86iVnqR";
const TABLE_ID = "tbl6pOHHYLRe0ImK";

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  useCase?: unknown;
  volume?: unknown;
  message?: unknown;
};

type CleanLead = {
  name: string;
  email: string;
  company: string;
  useCase: string;
  volume: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown, max = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function validate(body: LeadPayload): { ok: true; data: CleanLead } | { ok: false; error: string } {
  const name = asString(body.name, 200);
  const email = asString(body.email, 320);
  const company = asString(body.company, 200);
  const useCase = asString(body.useCase, 200);
  const volume = asString(body.volume, 200);
  const message = asString(body.message, 4000);

  if (!name) return { ok: false, error: "Name is required" };
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "A valid email is required" };
  }
  if (!company) return { ok: false, error: "Company is required" };
  if (!useCase) return { ok: false, error: "Use case is required" };

  return { ok: true, data: { name, email, company, useCase, volume, message } };
}

async function getTenantAccessToken(appId: string, appSecret: string): Promise<string> {
  const res = await fetch(
    `${FEISHU_BASE}/auth/v3/tenant_access_token/internal`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`feishu auth http ${res.status}`);
  }

  const data = (await res.json()) as {
    code: number;
    msg?: string;
    tenant_access_token?: string;
  };

  if (data.code !== 0 || !data.tenant_access_token) {
    throw new Error(`feishu auth code ${data.code}: ${data.msg ?? "unknown"}`);
  }

  return data.tenant_access_token;
}

async function createBitableRecord(token: string, fields: Record<string, string>): Promise<void> {
  const res = await fetch(
    `${FEISHU_BASE}/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ fields }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`feishu bitable http ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = (await res.json()) as { code: number; msg?: string };
  if (data.code !== 0) {
    throw new Error(`feishu bitable code ${data.code}: ${data.msg ?? "unknown"}`);
  }
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validated = validate(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;

  if (!appId || !appSecret) {
    console.warn("[submit-lead] Missing FEISHU_APP_ID/FEISHU_APP_SECRET — skipping Feishu write");
    // Don't block conversion — log to server and let the user proceed.
    console.info("[submit-lead] lead", validated.data);
    return NextResponse.json(
      { ok: true, persisted: false, reason: "feishu_not_configured" },
      { status: 200 },
    );
  }

  // Field names must match the column names in the Feishu Bitable.
  // If you renamed columns, update these keys to match.
  const fields: Record<string, string> = {
    Name: validated.data.name,
    Email: validated.data.email,
    Company: validated.data.company,
    "Use Case": validated.data.useCase,
    Volume: validated.data.volume,
    Message: validated.data.message,
    Source: "minimax-speech.com",
    "Submitted At": new Date().toISOString(),
  };

  try {
    const token = await getTenantAccessToken(appId, appSecret);
    await createBitableRecord(token, fields);
    return NextResponse.json({ ok: true, persisted: true }, { status: 200 });
  } catch (err) {
    console.error("[submit-lead] failed", err);
    // Still echo the lead to the server logs so we don't lose it.
    console.info("[submit-lead] lead", validated.data);
    return NextResponse.json(
      { ok: false, persisted: false, error: "feishu_write_failed" },
      { status: 502 },
    );
  }
}
