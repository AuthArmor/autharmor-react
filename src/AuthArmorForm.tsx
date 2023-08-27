import type {
    IAuthenticationSuccessResult,
    IRegistrationSuccessResult
} from "@autharmor/autharmor-js";
import type {
    AuthArmorFormCustomElementProps,
    IAuthArmorInteractiveClientConfiguration,
    LogInEvent,
    RegisterEvent
} from "@autharmor/autharmor-js-ui";
import { CSSProperties, useEffect, useRef } from "react";

import "@autharmor/autharmor-js-ui";

export type AuthArmorFormProps = Partial<Omit<AuthArmorFormCustomElementProps, "client">> &
    Pick<AuthArmorFormCustomElementProps, "client"> & {
        className?: string;
        style?: CSSProperties;
        onLogIn?: (authenticationResult: IAuthenticationSuccessResult) => void;
        onRegister?: (registrationResult: IRegistrationSuccessResult) => void;
    };

// Avoid unnecessary re-rendering because of the object instance changing.
const defaultInteractiveConfig: IAuthArmorInteractiveClientConfiguration = {};

export function AuthArmorForm({
    client = null,
    interactiveConfig = defaultInteractiveConfig,
    action = null,
    username = null,
    method = null,
    defaultAction = null,
    enableUsernamelessLogIn = true,
    className,
    style,
    onLogIn,
    onRegister
}: AuthArmorFormProps) {
    const form = useRef<HTMLElementTagNameMap["autharmor-form"]>();

    const handleLogIn = ({ authenticationResult }: LogInEvent) => onLogIn?.(authenticationResult);
    const handleRegister = ({ registrationResult }: RegisterEvent) =>
        onRegister?.(registrationResult);

    useEffect(() => {
        form.current!.addEventListener(
            "logIn" as keyof HTMLElementEventMap,
            handleLogIn as EventListenerOrEventListenerObject
        );

        form.current!.addEventListener(
            "register" as keyof HTMLElementEventMap,
            handleRegister as EventListenerOrEventListenerObject
        );

        return () => {
            form.current?.removeEventListener(
                "logIn" as keyof HTMLElementEventMap,
                handleLogIn as EventListenerOrEventListenerObject
            );

            form.current?.removeEventListener(
                "register" as keyof HTMLElementEventMap,
                handleRegister as EventListenerOrEventListenerObject
            );
        };
    }, []);

    useEffect(() => {
        form.current!.client = client;
    }, [client]);

    useEffect(() => {
        form.current!.interactiveConfig = interactiveConfig;
    }, [interactiveConfig]);

    return (
        <autharmor-form
            ref={form}
            action={action}
            username={username}
            method={method}
            defaultAction={defaultAction}
            enableUsernamelessLogIn={enableUsernamelessLogIn}
            class={className}
            style={style}
        />
    );
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "autharmor-form": any;
        }
    }
}
