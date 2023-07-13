"use client";

import { AuthArmorForm } from "@autharmor/ui-react";
import { useState } from "react";
import { authArmorClient, authArmorInteractiveClientConfig } from "@/lib/authArmor";

// @TODO: Remove import.
import "@autharmor/ui";
import { IAuthArmorInteractiveClientConfiguration } from "@autharmor/ui";
import { ensureSuccessCode } from "@/lib/http/ensureSuccessCode";
import { LogInRequest } from "../auth/log-in/route";
import { RegisterRequest } from "../auth/register/route";
import { IAuthenticationSuccessResult, IRegistrationSuccessResult } from "@autharmor/sdk";

export default function SignUpLogInPage() {
    const [allowLogIn, setAllowLogIn] = useState(true);
    const [allowRegister, setAllowRegister] = useState(true);
    const [interactiveConfig, setInteractiveConfig] =
        useState<IAuthArmorInteractiveClientConfiguration>({
            ...authArmorInteractiveClientConfig,
            permittedMethods: {
                authenticator: true,
                magicLinkEmail: true,
                webAuthn: true
            }
        });
    const [allowUsernameless, setAllowUsernameless] = useState(true);

    const [allowLogInNext, setAllowLogInNext] = useState(allowLogIn);
    const [allowRegisterNext, setAllowRegisterNext] = useState(allowRegister);
    const [allowAuthenticatorNext, setAllowAuthenticatorNext] = useState(
        interactiveConfig.permittedMethods!.authenticator
    );
    const [allowMagicLinkEmailNext, setAllowMagicLinkEmailNext] = useState(
        interactiveConfig.permittedMethods!.magicLinkEmail
    );
    const [allowWebAuthnNext, setAllowWebAuthnNext] = useState(
        interactiveConfig.permittedMethods!.webAuthn
    );
    const [allowUsernamelessNext, setAllowUsernamelessNext] = useState(allowUsernameless);

    const handleApply = () => {
        setAllowLogIn(allowLogInNext);
        setAllowRegister(allowRegisterNext);
        setInteractiveConfig({
            ...interactiveConfig,
            permittedMethods: {
                authenticator: allowAuthenticatorNext,
                magicLinkEmail: allowMagicLinkEmailNext,
                webAuthn: allowWebAuthnNext
            }
        });
        setAllowUsernameless(allowUsernamelessNext);
    };

    const handleLogIn = async (
        authenticationResult: IAuthenticationSuccessResult
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
        registrationResult: IRegistrationSuccessResult
    ): Promise<void> => {
        const response = await fetch("/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: registrationResult.userId,
                username: registrationResult.username
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
                    enableLogIn={allowLogIn}
                    enableRegistration={allowRegister}
                    interactiveConfig={interactiveConfig}
                    enableUsernameless={allowUsernameless}
                    className="column"
                />
                <div className="column is-three-fifths">
                    <div className="field">
                        <p className="label">Allowed Actions</p>
                        <div className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={allowLogInNext}
                                    onChange={(e) => setAllowLogInNext(e.target.checked)}
                                />
                                Log in
                            </label>
                        </div>
                        <div className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={allowRegisterNext}
                                    onChange={(e) => setAllowRegisterNext(e.target.checked)}
                                />
                                Register
                            </label>
                        </div>
                    </div>
                    <div className="field">
                        <p className="label">Allowed Methods</p>
                        <div className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={allowAuthenticatorNext}
                                    onChange={(e) => setAllowAuthenticatorNext(e.target.checked)}
                                />
                                Authenticator
                            </label>
                        </div>
                        <div className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={allowMagicLinkEmailNext}
                                    onChange={(e) => setAllowMagicLinkEmailNext(e.target.checked)}
                                />
                                Magic link email
                            </label>
                        </div>
                        <div className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={allowWebAuthnNext}
                                    onChange={(e) => setAllowWebAuthnNext(e.target.checked)}
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
                                    checked={allowUsernamelessNext}
                                    onChange={(e) => setAllowUsernamelessNext(e.target.checked)}
                                />
                                Allow usernameless login
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
