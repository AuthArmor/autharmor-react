import { AuthArmorClient } from "@autharmor/sdk";
import { authArmorClientConfig } from "./authArmorClientConfig";

export const authArmorClient = new AuthArmorClient(authArmorClientConfig);
