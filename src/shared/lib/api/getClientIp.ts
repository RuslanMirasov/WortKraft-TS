export function getClientIp(req: any): string {
  const h = req?.headers;

  const xf =
    (typeof h?.get === 'function' ? h.get('x-forwarded-for') : h?.['x-forwarded-for']) ??
    (typeof h?.get === 'function' ? h.get('x-real-ip') : h?.['x-real-ip']) ??
    '';

  const ip = String(xf).split(',')[0]?.trim();
  return ip || 'unknown';
}
