import { unsealData } from "iron-session";
import { cookies } from "next/headers";
import { authOptions } from "./authOptions";
import { AuthSessionData } from "./AuthSessionData";

export async function readAuthCookie(): Promise<AuthSessionData | null> {
    const authCookie = cookies().get(authOptions.sessionCookie)?.value;

    if (authCookie === undefined) {
        return null;
    }

    let sessionData: AuthSessionData;

    try {
        sessionData = await unsealData<AuthSessionData>(authCookie, {
            password: authOptions.sessionSecret,
            ttl: authOptions.sessionTtl
        });
    } catch {
        return null;
    }

    if (Object.entries(sessionData).length === 0) {
        return null;
    }

    return sessionData;
}
