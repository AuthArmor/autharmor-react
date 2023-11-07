import {
    IAuthenticationFailureResult,
    IAuthenticationSuccessResult,
    IRegistrationFailureResult,
    IRegistrationSuccessResult
} from "@autharmor/autharmor-js";
import type {
    AuthArmorFormCustomElementProps,
    ErrorThrownEvent,
    IAuthArmorInteractiveClientConfiguration,
    LogInEvent,
    LogInFailureEvent,
    OutOfBandLogInEvent,
    OutOfBandRegisterEvent,
    RegisterEvent,
    RegisterFailureEvent
} from "@autharmor/autharmor-js-ui";
import { CSSProperties, useEffect, useRef } from "react";

export type AuthArmorFormProps = Partial<Omit<AuthArmorFormCustomElementProps, "client">> &
    Pick<AuthArmorFormCustomElementProps, "client"> & {
        className?: string;
        style?: CSSProperties;

        onLogIn?: (authenticationResult: IAuthenticationSuccessResult) => void;
        onRegister?: (registrationResult: IRegistrationSuccessResult) => void;

        onOutOfBandLogIn?: (authenticationResult: IAuthenticationSuccessResult) => void;
        onOutOfBandRegister?: (registrationResult: IRegistrationSuccessResult) => void;

        onLogInFailure?: (authenticationResult: IAuthenticationFailureResult) => void;
        onRegisterFailure?: (registrationResult: IRegistrationFailureResult) => void;

        onError?: (error: unknown) => void;
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
    onRegister,
    onOutOfBandLogIn,
    onOutOfBandRegister,
    onLogInFailure,
    onRegisterFailure,
    onError
}: AuthArmorFormProps) {
    const form = useRef<HTMLElementTagNameMap["autharmor-form"]>();

    const handleLogIn = ({ authenticationResult }: LogInEvent) => onLogIn?.(authenticationResult);
    const handleRegister = ({ registrationResult }: RegisterEvent) =>
        onRegister?.(registrationResult);

    const handleOutOfBandLogIn = ({ authenticationResult }: OutOfBandLogInEvent) =>
        onOutOfBandLogIn?.(authenticationResult);
    const handleOutOfBandRegister = ({ registrationResult }: OutOfBandRegisterEvent) =>
        onOutOfBandRegister?.(registrationResult);

    const handleLogInFailure = ({ authenticationResult }: LogInFailureEvent) =>
        onLogInFailure?.(authenticationResult);
    const handleRegisterFailure = ({ registrationResult }: RegisterFailureEvent) =>
        onRegisterFailure?.(registrationResult);

    const handleError = ({ error }: ErrorThrownEvent) => onError?.(error);

    useEffect(() => {
        form.current!.addEventListener(
            "logIn" as keyof HTMLElementEventMap,
            handleLogIn as EventListenerOrEventListenerObject
        );

        form.current!.addEventListener(
            "register" as keyof HTMLElementEventMap,
            handleRegister as EventListenerOrEventListenerObject
        );

        form.current!.addEventListener(
            "outOfBandLogIn" as keyof HTMLElementEventMap,
            handleOutOfBandLogIn as EventListenerOrEventListenerObject
        );

        form.current!.addEventListener(
            "outOfBandRegister" as keyof HTMLElementEventMap,
            handleOutOfBandRegister as EventListenerOrEventListenerObject
        );

        form.current!.addEventListener(
            "logInFailure" as keyof HTMLElementEventMap,
            handleLogInFailure as EventListenerOrEventListenerObject
        );

        form.current!.addEventListener(
            "registerFailure" as keyof HTMLElementEventMap,
            handleRegisterFailure as EventListenerOrEventListenerObject
        );

        form.current!.addEventListener(
            "error" as keyof HTMLElementEventMap,
            handleError as EventListenerOrEventListenerObject
        );
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
