import { AuditResult } from "./types";

/**
 * Storage layer with Vercel KV as primary and /tmp as fallback.
 * On Vercel, /tmp is ephemeral across cold starts, so KV is needed for persistence.
 * If KV env vars are not set, the system falls back to /tmp (works within same warm instance).
 */

const KV_PREFIX = "full-audit:result:";

async function getKv() {
  if (
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  ) {
    const { kv } = await import("@vercel/kv");
    return kv;
  }
  return null;
}

export async function saveResult(result: AuditResult): Promise<void> {
  const kv = await getKv();

  if (kv) {
    // Store in Vercel KV with 1-year TTL
    await kv.set(`${KV_PREFIX}${result.id}`, JSON.stringify(result), {
      ex: 365 * 24 * 60 * 60, // 1 year in seconds
    });
    return;
  }

  // Fallback to /tmp
  try {
    const fs = await import("fs");
    const dir = "/tmp/full-audit-results";
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      /* ok */
    }
    fs.writeFileSync(`${dir}/${result.id}.json`, JSON.stringify(result));
  } catch {
    console.warn("Could not write to /tmp, result only in logs");
  }
}

export async function getResult(id: string): Promise<AuditResult | null> {
  const kv = await getKv();

  if (kv) {
    const data = await kv.get<string>(`${KV_PREFIX}${id}`);
    if (!data) return null;
    try {
      return JSON.parse(data) as AuditResult;
    } catch {
      return null;
    }
  }

  // Fallback to /tmp
  try {
    const fs = await import("fs");
    const filePath = `/tmp/full-audit-results/${id}.json`;
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as AuditResult;
  } catch {
    return null;
  }
}
