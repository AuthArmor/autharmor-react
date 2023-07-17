import { AuthArmorClient } from "@autharmor/autharmor-js";
import { authArmorClientConfig } from "./authArmorClientConfig";

export const authArmorClient = new AuthArmorClient(authArmorClientConfig);
