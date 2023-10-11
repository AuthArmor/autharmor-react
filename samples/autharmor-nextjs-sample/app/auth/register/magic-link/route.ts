import { ApiError, IMagicLinkEmailRegistrationResult } from "@autharmor/autharmor-node";
import { NextRequest, NextResponse } from "next/server";
import { AuthSessionData, createAuthCookieHeader } from "@/lib/auth";
import { authArmorApiClient } from "@/lib/authArmorServer/authArmorApiClient";

export async function GET(request: NextRequest): Promise<NextResponse<void>> {
    const { searchParams } = new URL(request.url);

    const registrationId = searchParams.get("registration_id");
    const validationToken = searchParams.get("registration_validation_token");

    if (registrationId === null || validationToken === null) {
        return new NextResponse(null, {
            status: 400
        });
    }

    let validationResult: IMagicLinkEmailRegistrationResult;

    try {
        validationResult = await authArmorApiClient.validateRegistrationAsync(
            "magiclink_email",
            registrationId,
            {
                validationToken
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
        userId: validationResult.user_id,
        username: validationResult.username
    };

    return new NextResponse(null, {
        status: 307,
        headers: {
            Location: "/",
            "Set-Cookie": await createAuthCookieHeader(authSessionData)
        }
    });
}
