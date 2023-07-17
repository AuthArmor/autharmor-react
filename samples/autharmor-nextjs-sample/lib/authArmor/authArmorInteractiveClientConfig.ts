import { IAuthArmorInteractiveClientConfiguration } from "@autharmor/autharmor-js-ui";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authArmorInteractiveClientConfig: IAuthArmorInteractiveClientConfiguration = {
    defaultMagicLinkEmailLogInRedirectUrl: `${baseUrl}/auth/log-in/magic-link`,
    defaultMagicLinkEmailRegisterRedirectUrl: `${baseUrl}/auth/register/magic-link`
};
