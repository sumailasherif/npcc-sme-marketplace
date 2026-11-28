import "server-only";

export type ResendOtpPayload = {
  to: string;
  code: string;
  lang?: string;
  mode?: "signup" | "magiclink";
};

/**
 * Sends a branded Bazar 6-digit verification / sign-in code via Resend REST API
 * when RESEND_API_KEY is configured in environment variables.
 */
export async function sendResendOtpEmail({
  to,
  code,
  lang = "en",
  mode = "magiclink",
}: ResendOtpPayload): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "missingResendKey" };

  const from =
    process.env.RESEND_FROM_EMAIL || "Bazar Mauritius <onboarding@resend.dev>";

  const subjects: Record<string, string> = {
    en:
      mode === "signup"
        ? `Welcome to Bazar — verify with code ${code}`
        : `Your Bazar sign-in code: ${code}`,
    fr: `Votre code Bazar : ${code}`,
    mfe: `Ou kod Bazar : ${code}`,
  };

  const subject = subjects[lang] || subjects.en;

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:480px;margin:0 auto;padding:28px 24px;background:#f4f0e6;color:#0e0e0c;border-radius:18px;">
    <div style="margin-bottom:20px;">
      <span style="display:inline-block;background:#d4f53c;color:#0e0e0c;font-weight:800;font-size:18px;letter-spacing:-0.03em;padding:5px 12px;border-radius:8px;">bazar</span>
    </div>
    <p style="margin:0 0 10px;font-size:15px;font-weight:600;">
      ${mode === "signup" ? "Welcome to Bazar! Enter this 6-digit code to verify your email:" : "Enter this 6-digit code to sign in to Bazar:"}
    </p>
    <div style="background:#0e0e0c;color:#d4f53c;font-size:32px;font-weight:800;letter-spacing:8px;text-align:center;padding:16px 20px;border-radius:14px;margin:14px 0 18px;">
      ${code}
    </div>
    <p style="margin:0 0 16px;font-size:13px;color:#4a463d;">This code is valid for 1 hour.</p>
    <hr style="border:none;border-top:1px solid #ded8c8;margin:16px 0;" />
    <p style="margin:0 0 6px;font-size:13px;"><b>FR</b> — Votre code de vérification : <b>${code}</b> (valable 1 heure).</p>
    <p style="margin:0 0 16px;font-size:13px;"><b>KR</b> — Ou kod pou konekte : <b>${code}</b> (valab 1 erdtan).</p>
    <p style="margin:0;font-size:11px;color:#6b665a;">If you didn't request this email, you can safely ignore it.</p>
  </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, html }),
    });
    if (!res.ok) {
      return { ok: false, error: res.status === 429 ? "tooManyRequests" : "resendFailed" };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "resendFailed" };
  }
}
