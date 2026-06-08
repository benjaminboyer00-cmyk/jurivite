export function buildSigningUrl(token: string, siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, "")}/sign/${token}`;
}
