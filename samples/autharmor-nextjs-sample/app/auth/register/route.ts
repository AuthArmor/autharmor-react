import { ApiError } from "@autharmor/autharmor-js";
import { NextRequest, NextResponse } from "next/server";
import { AuthSessionData, createAuthCookieHeader } from "@/lib/auth";
import { authArmorApiClient } from "@/lib/authArmorServer/authArmorApiClient";

export type RegisterRequest = {
    registrationId: string;
    authenticationMethod: "authenticator" | "webAuthn";
    validationToken: string;
};

export async function POST(request: NextRequest): Promise<NextResponse<void>> {
    const requestBody = (await request.json()) as RegisterRequest;

    if (
        typeof requestBody.registrationId !== "string" ||
        typeof requestBody.authenticationMethod !== "string" ||
        typeof requestBody.validationToken !== "string"
    ) {
        return new NextResponse(null, {
            status: 400
        });
    }

    const authenticationMethodMapping = {
        authenticator: "authenticator",
        webAuthn: "webauthn"
    } as const;

    let registrationResult;

    try {
        registrationResult = await authArmorApiClient.validateRegistrationAsync(
            authenticationMethodMapping[requestBody.authenticationMethod],
            requestBody.registrationId,
            {
                validationToken: requestBody.validationToken
            }
        );
    } catch (error: unknown) {
        if (error instanceof ApiError && (error.statusCode === 401 || error.statusCode === 403)) {
            return new NextResponse(null, {
                status: error.statusCode
            });
        } else {
            throw error;
        }
    }

    const authSessionData: AuthSessionData = {
        userId: registrationResult.user_id,
        username: registrationResult.username
    };

    return new NextResponse(null, {
        status: 204,
        headers: {
            "Set-Cookie": await createAuthCookieHeader(authSessionData)
        }
    });
}
