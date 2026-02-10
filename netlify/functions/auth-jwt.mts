import { SignJWT, jwtVerify } from "jose";

const SECRET = process.env.AUTH_JWT_SECRET ?? "change-me-in-production";
const ISSUER = "wasila";
const AUDIENCE = "wasila-app";
const EXP = "7d";

function getKey() {
  return new TextEncoder().encode(SECRET);
}

export type TokenPayload = { sub: string; email: string; role: string };

export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(EXP)
    .sign(getKey());
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getKey(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}
