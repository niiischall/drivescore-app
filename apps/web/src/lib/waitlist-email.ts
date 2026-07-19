import { getSiteUrl, siteConfig } from "@/lib/site";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export type WaitlistEmailContent = {
  subject: string;
  text: string;
  html: string;
};

/** Rich waitlist confirmation — light marketing layout + absolute asset URLs. */
export function buildWaitlistConfirmationEmail(
  email: string,
): WaitlistEmailContent {
  const siteUrl = getSiteUrl();
  const safeEmail = escapeHtml(email);
  const logoImg = `${siteUrl}/icons/icon-512.png`;
  const subject = "You're on the DriveScore waitlist — E20 clarity is coming";

  const text = [
    "Congratulations! You're on the DriveScore waitlist.",
    "",
    `Hi — we've saved ${email}.`,
    "",
    "E20 is now standard at pumps across India. Most owners still don't have a clear answer for their exact car. DriveScore is building that answer: a transparent 0–100 E20 compatibility score for Indian petrol cars — with confidence, not rumor.",
    "",
    "What you'll get at launch:",
    "• A free first check for your make, model, and era",
    "• A score built on 10 research-backed markers (OEM stance, seals, corrosion, ECU trim, and more)",
    "• Three confidence bands so you know when data is solid vs inferred",
    "• Plain-language reasons — AI explains the score; it never invents the number",
    "",
    "Result in under 60 seconds. Built for Indian roads and Indian cars.",
    "",
    `We'll email you at ${email} when DriveScore opens.`,
    "",
    `Visit: ${siteUrl}`,
    "",
    "No spam. Unsubscribe anytime.",
    "",
    "— The DriveScore team",
  ].join("\n");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#eef0f4;font-family:Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    You're on the list. A transparent E20 score for your Indian car is coming — free first check.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef0f4;padding:28px 12px 40px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background:#ffffff;border:1px solid #dde1ea;border-radius:20px;overflow:hidden;">

          <tr>
            <td style="padding:28px 32px 12px;background:#ffffff;">
              <p style="margin:0 0 6px;font-size:15px;letter-spacing:0.02em;color:#6841e6;">
                <strong style="color:#1a1528;font-weight:700;">Drive</strong><span style="font-weight:400;color:#4a4458;">score</span>
              </p>
              <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">
                Waitlist confirmed · Built for India
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:36px 32px;background:#f5f6f9;">
              <img
                src="${logoImg}"
                width="160"
                height="160"
                alt="DriveScore"
                style="display:block;width:160px;height:160px;border:0;outline:none;border-radius:36px;"
              />
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 8px;background:#ffffff;">
              <h1 style="margin:0 0 14px;font-size:28px;line-height:1.25;font-weight:700;color:#1a1528;">
                You're on the waitlist
              </h1>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#3f4654;">
                E20 is already at the pump. What most owners still don't have is a clear answer for
                <em style="font-style:normal;color:#1a1528;font-weight:600;">their</em> car.
              </p>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#3f4654;">
                DriveScore is building India's most transparent E20 compatibility score —
                a 0–100 rating with confidence, so you get a score, not a rumor.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.55;color:#5c6575;">
                We'll write to <a href="mailto:${safeEmail}" style="color:#6841e6;text-decoration:underline;">${safeEmail}</a>
                when we launch. Your first check stays free.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 8px;background:#ffffff;">
              <p style="margin:0 0 14px;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">
                What you'll get
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:0 0 12px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f8fb;border:1px solid #e4e7ef;border-radius:14px;">
                      <tr>
                        <td style="padding:16px 18px;">
                          <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#1a1528;">Free first check</p>
                          <p style="margin:0;font-size:14px;line-height:1.5;color:#5c6575;">
                            Detailed score for your exact model — result in under 60 seconds.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 12px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f8fb;border:1px solid #e4e7ef;border-radius:14px;">
                      <tr>
                        <td style="padding:16px 18px;">
                          <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#1a1528;">10 markers, real weights</p>
                          <p style="margin:0;font-size:14px;line-height:1.5;color:#5c6575;">
                            OEM stance, manufacture era, seals, corrosion, fuel pump, injection, ECU trim, sensors, and usage —
                            grouped into ground truth, materials, calibration, and context.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 12px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f8fb;border:1px solid #e4e7ef;border-radius:14px;">
                      <tr>
                        <td style="padding:16px 18px;">
                          <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#1a1528;">Confidence, not fine print</p>
                          <p style="margin:0;font-size:14px;line-height:1.5;color:#5c6575;">
                            Three bands — Likely Compatible, Use With Caution, Not Recommended —
                            plus a low-confidence flag when OEMs haven't published a stance.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f8fb;border:1px solid #e4e7ef;border-radius:14px;">
                      <tr>
                        <td style="padding:16px 18px;">
                          <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#1a1528;">AI explains. It doesn't invent.</p>
                          <p style="margin:0;font-size:14px;line-height:1.5;color:#5c6575;">
                            Every number comes from a versioned rubric. The narrative only explains the breakdown —
                            never calculates the score.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;background:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e4e7ef;border-bottom:1px solid #e4e7ef;">
                <tr>
                  <td width="33%" align="center" style="padding:18px 8px;">
                    <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#1a1528;">10</p>
                    <p style="margin:0;font-size:11px;line-height:1.35;color:#6b7280;">Markers checked</p>
                  </td>
                  <td width="33%" align="center" style="padding:18px 8px;border-left:1px solid #e4e7ef;border-right:1px solid #e4e7ef;">
                    <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#1a1528;">3</p>
                    <p style="margin:0;font-size:11px;line-height:1.35;color:#6b7280;">Confidence bands</p>
                  </td>
                  <td width="33%" align="center" style="padding:18px 8px;">
                    <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#1a1528;">₹0</p>
                    <p style="margin:0;font-size:11px;line-height:1.35;color:#6b7280;">First check</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 32px 28px;background:#ffffff;" align="center">
              <a href="${siteUrl}" style="display:inline-block;background:#6841e6;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:999px;">
                Visit DriveScore
              </a>
              <p style="margin:16px 0 0;font-size:13px;line-height:1.5;color:#6b7280;">
                Bookmark the site — we'll email you the moment checks open.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px 28px;background:#f7f8fb;border-top:1px solid #e4e7ef;">
              <p style="margin:0 0 8px;font-size:13px;line-height:1.5;color:#5c6575;">
                ${escapeHtml(siteConfig.description)}
              </p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:#6b7280;">
                No spam · Unsubscribe anytime · Heuristic estimate, not an OEM certification<br />
                <a href="${siteUrl}" style="color:#6841e6;">${escapeHtml(siteUrl.replace(/^https?:\/\//, ""))}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return { subject, text, html };
}
