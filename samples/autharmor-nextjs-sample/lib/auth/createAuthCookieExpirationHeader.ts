import { authOptions } from "./authOptions";

export function createAuthCookieExpirationHeader(): string {
    const encodedCookieName = encodeURIComponent(authOptions.sessionCookie);

    const cookieHeader = `${encodedCookieName}=; Path=/; Max-Age=-1`;

    return cookieHeader;
}
