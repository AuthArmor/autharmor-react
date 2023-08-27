import { IAuthArmorClientConfiguration } from "@autharmor/autharmor-node";

export const authArmorClientConfig: IAuthArmorClientConfiguration = {
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!
};
