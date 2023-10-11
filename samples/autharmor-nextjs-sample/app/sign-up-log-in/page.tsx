"use client";

import {
    AuthArmorClient,
    IAuthenticationSuccessResult,
    IRegistrationSuccessResult
} from "@autharmor/autharmor-js";
import { IAuthArmorInteractiveClientConfiguration, LogInEvent, RegisterEvent } from "@autharmor/autharmor-js-ui";
import "@autharmor/autharmor-js-ui";
import { AuthArmorForm } from "@autharmor/autharmor-react";
import { useEffect, useState } from "react";

import { authArmorClientConfig, authArmorInteractiveClientConfig } from "@/lib/authArmor";
import { ensureSuccessCode } from "@/lib/http/ensureSuccessCode";
import { LogInRequest } from "../auth/log-in/route";
import { RegisterRequest } from "../auth/register/route";

export default function SignUpLogInPage() {
    const [authArmorClient, setAuthArmorClient] = useState<AuthArmorClient>(null!);
    useEffect(() => setAuthArmorClient(new AuthArmorClient(authArmorClientConfig)), []);

    const [enforceAction, setEnforceAction] = useState<"logIn" | "register" | null>(null);
    const [enforceUsername, setEnforceUsername] = useState<string | null>(null);
    const [enforceMethod, setEnforceMethod] = useState<
        "authenticator" | "webAuthn" | "magicLinkEmail" | null
    >(null);
    const [enableUsernamelessLogIn, setEnableUsernamelessLogIn] = useState<boolean>(true);
    const [interactiveConfig, setInteractiveConfig] =
        useState<IAuthArmorInteractiveClientConfiguration>({
            ...authArmorInteractiveClientConfig,
            permittedMethods: {
                authenticator: true,
                magicLinkEmail: true,
                webAuthn: true
            }
        });

    const [enforceActionNext, setEnforceActionNext] = useState(enforceAction);
    const [enforceUsernameNext, setEnforceUsernameNext] = useState(enforceUsername);
    const [enforceMethodNext, setEnforceMethodNext] = useState(enforceMethod);
    const [enableUsernamelessLogInNext, setEnableUsernamelessLogInNext] =
        useState(enableUsernamelessLogIn);
    const [allowAuthenticatorNext, setAllowAuthenticatorNext] = useState(
        interactiveConfig.permittedMethods!.authenticator
    );
    const [allowMagicLinkEmailNext, setAllowMagicLinkEmailNext] = useState(
        interactiveConfig.permittedMethods!.magicLinkEmail
    );
    const [allowWebAuthnNext, setAllowWebAuthnNext] = useState(
        interactiveConfig.permittedMethods!.webAuthn
    );

    const handleApply = () => {
        setEnforceAction(enforceActionNext);
        setEnforceUsername(enforceUsernameNext);
        setEnforceMethod(enforceMethodNext);
        setEnableUsernamelessLogIn(enableUsernamelessLogInNext);
        setInteractiveConfig({
            ...interactiveConfig,
            permittedMethods: {
                authenticator: allowAuthenticatorNext,
                magicLinkEmail: allowMagicLinkEmailNext,
                webAuthn: allowWebAuthnNext
            }
        });
    };

    const handleLogIn = async (
        { authenticationResult }: LogInEvent
    ): Promise<void> => {
        const response = await fetch("/auth/log-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                requestId: authenticationResult.requestId,
                authenticationMethod: authenticationResult.authenticationMethod,
                validationToken: authenticationResult.validationToken
            } satisfies LogInRequest)
        });
        ensureSuccessCode(response);

        window.location.href = "/";
    };

    const handleRegister = async (
        {registrationResult}: RegisterEvent
    ): Promise<void> => {
        const response = await fetch("/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                registrationId: registrationResult.registrationId,
                authenticationMethod: registrationResult.authenticationMethod as
                    | "authenticator"
                    | "webAuthn",
                validationToken: registrationResult.validationToken
            } satisfies RegisterRequest)
        });
        ensureSuccessCode(response);

        window.location.href = "/";
    };

    return (
        <>
            <section className="section">
                <h1 className="title">Authentication form</h1>
                <p>
                    The AuthArmor UI supports rendering a form that allows the user to log in or
                    register. It emits events when that happens with the result of the action which
                    can be sent to the server for further processing and to establish a session.
                </p>
            </section>

            <section className="section columns">
                <AuthArmorForm
                    client={authArmorClient}
                    onLogIn={handleLogIn}
                    onRegister={handleRegister}
                    action={enforceAction}
                    username={enforceUsername}
                    method={enforceMethod}
                    enableUsernamelessLogIn={enableUsernamelessLogIn}
                    interactiveConfig={interactiveConfig}
                    className="column"
                />
                <div className="column is-three-fifths">
                    <div className="field">
                        <p className="label">Enforce Action</p>
                        <div className="control">
                            <div className="select">
                                <select
                                    onChange={(e) =>
                                        setEnforceActionNext(
                                            (e.target.value || null) as typeof enforceAction
                                        )
                                    }
                                    value={enforceActionNext ?? ""}
                                >
                                    <option value="">None</option>
                                    <option value="logIn">Log In</option>
                                    <option value="register">Register</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <p className="label">Enforce Username</p>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                onChange={(e) => setEnforceUsernameNext(e.target.value || null)}
                                value={enforceUsernameNext ?? ""}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <p className="label">Enforce Method</p>
                        <div className="control">
                            <div className="select">
                                <select
                                    onChange={(e) =>
                                        setEnforceMethodNext(
                                            (e.target.value || null) as typeof enforceMethod
                                        )
                                    }
                                    value={enforceMethodNext ?? ""}
                                >
                                    <option value="">None</option>
                                    <option value="authenticator">Authenticator App</option>
                                    <option value="magicLinkEmail">Magic Link Email</option>
                                    <option value="webAuthn">WebAuthn</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <p className="label">Allowed Methods</p>
                        <div className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    onChange={(e) => setAllowAuthenticatorNext(e.target.checked)}
                                    checked={allowAuthenticatorNext}
                                />
                                Authenticator
                            </label>
                        </div>
                        <div className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    onChange={(e) => setAllowMagicLinkEmailNext(e.target.checked)}
                                    checked={allowMagicLinkEmailNext}
                                />
                                Magic link email
                            </label>
                        </div>
                        <div className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    onChange={(e) => setAllowWebAuthnNext(e.target.checked)}
                                    checked={allowWebAuthnNext}
                                />
                                WebAuthn
                            </label>
                        </div>
                    </div>
                    <div className="field">
                        <p className="label">Miscellaneous</p>
                        <div className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    onChange={(e) =>
                                        setEnableUsernamelessLogInNext(e.target.checked)
                                    }
                                    checked={enableUsernamelessLogInNext}
                                />
                                Enable usernameless login
                            </label>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button className="button is-link" onClick={handleApply}>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
