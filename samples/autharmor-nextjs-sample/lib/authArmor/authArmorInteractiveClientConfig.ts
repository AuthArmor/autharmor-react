import { IAuthArmorInteractiveClientConfiguration } from "@autharmor/ui";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authArmorInteractiveClientConfig: IAuthArmorInteractiveClientConfiguration = {
    defaultEmailMagicLinkLogInRedirectUrl: `${baseUrl}/auth/log-in/magic-link`,
    defaultEmailMagicLinkRegisterRedirectUrl: `${baseUrl}/auth/register/magic-link`
};
