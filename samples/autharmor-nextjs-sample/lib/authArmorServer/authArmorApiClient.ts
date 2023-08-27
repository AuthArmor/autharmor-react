import { AuthArmorApiClient } from "@autharmor/autharmor-node";
import { authArmorClientConfig } from "./authArmorClientConfig";

export const authArmorApiClient = new AuthArmorApiClient(authArmorClientConfig);
