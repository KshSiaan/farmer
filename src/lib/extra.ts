export function isValidJwt(token: string): boolean {
  // Check if the token has 3 parts separated by periods
  const parts = token.split(".");
  return (
    parts.length === 3 && parts.every((part) => /^[A-Za-z0-9-_]+$/.test(part))
  ); // Check for valid base64url format
}
