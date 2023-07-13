import { sealData } from "iron-session";
import { authOptions } from "./authOptions";
import { AuthSessionData } from "./AuthSessionData";

export async function createAuthCookieHeader(sessionData: AuthSessionData): Promise<string> {
    const seal = await sealData(sessionData, {
        password: authOptions.sessionSecret,
        ttl: authOptions.sessionTtl
    });

    const encodedCookieName = encodeURIComponent(authOptions.sessionCookie);
    const encodedCookieValue = encodeURIComponent(seal);

    const cookieHeader = `${encodedCookieName}=${encodedCookieValue}; Path=/`;

    return cookieHeader;
}
