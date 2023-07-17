import { AuthArmorClientConfiguration } from "@autharmor/autharmor-js";

export const authArmorClientConfig: AuthArmorClientConfiguration = {
    clientSdkApiKey: process.env.NEXT_PUBLIC_AUTHARMOR_CLIENT_SDK_API_KEY!,
    webAuthnClientId: process.env.NEXT_PUBLIC_AUTHARMOR_WEBAUTHN_CLIENT_ID
};
