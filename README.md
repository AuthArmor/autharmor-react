# Auth Armor Javascript Client-Side SDK UI Wrapper for React

Auth Armor provides a SaaS solution to authenticate your users exclusively using passwordless authentication methods such as WebAuthn, magic links and the proprietary Auth Armor mobile app.

This package wraps the `autharmor-form` component provided by the [@autharmor/ui](https://github.com/AuthArmor/autharmor-jsclient-sdk-ui) package. It allows you to use a native React component to render the Auth Armor form with the full benefits of type-checking and the ability to pass objects to components directly from the markup.

This package is designed to work together with [@autharmor/sdk](https://github.com/AuthArmor/autharmor-jsclient-sdk) and [@autharmor/ui](https://github.com/AuthArmor/autharmor-jsclient-sdk-ui). A knowledge of how those packages work will be helpful in using this package.

## Installation

This package is available on the NPM registry as `@autharmor/ui-react`. You must have the `@autharmor/sdk` and ``@autharmor/ui` packages to use it. Use your project's package manager to install all the packages:

```sh
# NPM
npm install @autharmor/sdk @autharmor/ui @autharmor/ui-react

# PNPM
pnpm add @autharmor/sdk @autharmor/ui @autharmor/ui-react

# Yarn
yarn add @autharmor/sdk @autharmor/ui @autharmor/ui-react
```

## Rendering the Auth Armor Form

This package exports a React component called `AuthArmorForm` which you can use in your React components:

```tsx
import { AuthArmorClient, IAuthenticationSuccessResult, IRegistrationSuccessResult } from "@autharmor/sdk";
import "@autharmor/ui";
import { AuthArmorForm } from "@autharmor/ui-react";

export function MyAuthArmorForm() {
    // Refer to the @autharmor/sdk documentation to learn how to instantiate an AuthArmorClient.
    const client = new AuthArmorClient(...);

    const onLogIn = (authenticationResult: IAuthenticationSuccessResult) => {
        console.log("Authenticated with", authenticationResult);
    };

    const onRegister = (registrationResult: IRegistrationSuccessResult) => {
        console.log("Registered with", registrationResult);
    };

    return (
        <AuthArmorForm
            client={client}
            enableRegistration={false}
            onLogIn={onLogIn}
        />
    );
}
```

The `AuthArmorForm` accepts all the properties that the `autharmor-form` component from the [@autharmor/ui](https://github.com/AuthArmor/autharmor-jsclient-sdk-ui) package accepts. Refer to its documentation to learn how to use these properties.

In addition, the component defines a few additional properties:

| **Property** | **Type**                                                       | **Description**                                                                      |
|--------------|----------------------------------------------------------------|--------------------------------------------------------------------------------------|
| `className`  | `string`                                                       | The CSS class to use for the `autharmor-form` component.                             |
| `style`      | `React.CSSProperties`                                          | The CSS styles to use for the `autharmor-form` component.                            |
| `onLogIn`    | `(authenticationResult: IAuthenticationSuccessResult) => void` | An event handler that is called when the user successfully logs in using the form.   |
| `onRegister` | `(registrationResult: IRegistrationSuccessResult) => void`     | An event handler that is called when the user successfully registers using the form. |

## Other Functionality

Other functionality is provided directly by the [@autharmor/sdk](https://github.com/AuthArmor/autharmor-jsclient-sdk) and [@autharmor/ui](https://github.com/AuthArmor/autharmor-jsclient-sdk-ui) packages. Refer to their documentation for more details on how to use Auth Armor in your application.
