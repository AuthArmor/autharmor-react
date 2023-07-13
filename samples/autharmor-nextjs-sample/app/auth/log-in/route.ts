import { NextRequest, NextResponse } from "next/server";
import { AuthSessionData, createAuthCookieHeader } from "@/lib/auth";

export type LogInRequest = {
    requestId: string;
    authenticationMethod: "authenticator" | "magicLinkEmail" | "webAuthn";
    validationToken: string;
};

export async function POST(request: NextRequest): Promise<NextResponse<void>> {
    const requestBody = (await request.json()) as LogInRequest;

    if (
        typeof requestBody.requestId !== "string" ||
        typeof requestBody.authenticationMethod !== "string" ||
        typeof requestBody.validationToken !== "string"
    ) {
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
        userId: requestBody.requestId,
        username: requestBody.requestId
    };

    return new NextResponse(null, {
        status: 204,
        headers: {
            "Set-Cookie": await createAuthCookieHeader(authSessionData)
        }
    });
}
