import { NextRequest, NextResponse } from "next/server";
import { AuthSessionData, createAuthCookieHeader } from "@/lib/auth";

export async function GET(request: NextRequest): Promise<NextResponse<void>> {
    const { searchParams } = new URL(request.url);

    const requestId = searchParams.get("auth_request_id");
    const validationToken = searchParams.get("auth_validation_token");

    if (requestId === null || validationToken === null) {
        return new NextResponse(null, {
            status: 400
        });
    }

    // autharmor: validate token
    const validationSucceeded = true;

    if (!validationSucceeded) {
        return new NextResponse(null, {
            status: 403
        });
    }

    // autharmor: fetch user data
    const authSessionData: AuthSessionData = {
        userId: requestId,
        username: requestId
    };

    return new NextResponse(null, {
        status: 307,
        headers: {
            Location: "/",
            "Set-Cookie": await createAuthCookieHeader(authSessionData)
        }
    });
}
