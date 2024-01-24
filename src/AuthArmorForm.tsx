import type {
    AuthArmorFormCustomElementEvents,
    AuthArmorFormCustomElementProps
} from "@autharmor/autharmor-js-ui";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { wrapWc } from "wc-react";

export type AuthArmorFormProps = AuthArmorFormCustomElementProps &
    AuthArmorFormCustomElementEvents &
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export const AuthArmorForm = wrapWc<AuthArmorFormProps>("autharmor-form");
