import { NextRequest, NextResponse } from "next/server";
import { AuthSessionData, createAuthCookieHeader } from "@/lib/auth";
import { authArmorApiClient } from "@/lib/authArmorServer/authArmorApiClient";

export type LogInRequest = {
    requestId: string;
    authenticationMethod: "authenticator" | "magicLinkEmail" | "passkey";
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

    const authenticationMethodMapping = {
        authenticator: "authenticator",
        passkey: "webauthn",
        magicLinkEmail: "magiclink_email"
    } as const;

    const validationResult = await authArmorApiClient.validateAuthenticationAsync(
        authenticationMethodMapping[requestBody.authenticationMethod],
        {
            requestId: requestBody.requestId,
            validationToken: requestBody.validationToken
        }
    );

    if (!validationResult.validate_auth_response_details.authorized) {
        return new NextResponse(null, {
            status: 403
        });
    }

    const authProfile =
        validationResult.validate_auth_response_details.auth_details.response_details
            .auth_profile_details;

    const authSessionData: AuthSessionData = {
        userId: authProfile.user_id,
        username: authProfile.username!
    };

    return new NextResponse(null, {
        status: 204,
        headers: {
            "Set-Cookie": await createAuthCookieHeader(authSessionData)
        }
    });
}
