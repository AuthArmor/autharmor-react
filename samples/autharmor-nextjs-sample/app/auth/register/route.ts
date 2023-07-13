import { NextRequest, NextResponse } from "next/server";
import { AuthSessionData, createAuthCookieHeader } from "@/lib/auth";

export type RegisterRequest = {
    userId: string;
    username: string;
};

export async function POST(request: NextRequest): Promise<NextResponse<void>> {
    const requestBody = (await request.json()) as RegisterRequest;

    if (typeof requestBody.userId !== "string" || typeof requestBody.username !== "string") {
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
        userId: requestBody.userId,
        username: requestBody.username
    };

    return new NextResponse(null, {
        status: 204,
        headers: {
            "Set-Cookie": await createAuthCookieHeader(authSessionData)
        }
    });
}
