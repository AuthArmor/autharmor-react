import type { IAuthenticationSuccessResult, IRegistrationSuccessResult } from "@autharmor/sdk";
import { IAuthArmorFormCustomElementProps, LogInEvent, RegisterEvent } from "@autharmor/ui";
import { CSSProperties, useEffect, useRef } from "react";

export type AuthArmorFormProps = Partial<IAuthArmorFormCustomElementProps> & {
    className?: string;
    style?: CSSProperties;
    onLogIn?: (authenticationResult: IAuthenticationSuccessResult) => void;
    onRegister?: (registrationResult: IRegistrationSuccessResult) => void;
};

export function AuthArmorForm({
    client = null,
    interactiveConfig = {},
    enableLogIn = true,
    enableRegistration = true,
    initialMode = "logIn",
    enableUsernameless = true,
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
            enable-log-in={enableLogIn}
            enable-registration={enableRegistration}
            initial-mode={initialMode}
            enable-usernameless={enableUsernameless}
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
