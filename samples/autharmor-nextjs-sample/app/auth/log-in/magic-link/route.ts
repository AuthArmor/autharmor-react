import { NextRequest, NextResponse } from "next/server";
import { AuthSessionData, createAuthCookieHeader } from "@/lib/auth";
import { authArmorApiClient } from "@/lib/authArmorServer/authArmorApiClient";

export async function GET(request: NextRequest): Promise<NextResponse<void>> {
    const { searchParams } = new URL(request.url);

    const requestId = searchParams.get("auth_request_id");
    const validationToken = searchParams.get("auth_validation_token");

    if (requestId === null || validationToken === null) {
        return new NextResponse(null, {
            status: 400
        });
    }

    const validationResult = await authArmorApiClient.validateAuthenticationAsync(
        "magiclink_email",
        {
            requestId,
            validationToken
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
        status: 307,
        headers: {
            Location: "/",
            "Set-Cookie": await createAuthCookieHeader(authSessionData)
        }
    });
}
