import { createAuthCookieExpirationHeader, readAuthCookie } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse<void>> {
    const sessionData = await readAuthCookie();

    if (sessionData === null) {
        return new NextResponse(null, {
            status: 400
        });
    }

    return new NextResponse(null, {
        status: 204,
        headers: {
            "Set-Cookie": createAuthCookieExpirationHeader()
        }
    });
}
