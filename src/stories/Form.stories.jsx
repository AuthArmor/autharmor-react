import { unflatten } from "flat";
import AuthArmor from "../components/AuthArmorForm";

const delimiter = ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "AuthArmor/Form",
  component: AuthArmor,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    formContainerStyle: {
      table: {
        category: "Styling",
        subCategory: "Form container styling",
      },
    },
    ["formStyle.accentColor"]: {
      control: "color",
      defaultValue: "#000",
      description: "Main form color",
      table: {
        type: {
          summary: "something short",
          detail: "something really really long",
        },
        category: "Styling",
        subCategory: "Form color palette",
      },
    },
    ["formStyle.backgroundColor"]: {
      control: "color",
      defaultValue: "#000",
      table: {
        category: "Styling",
        subCategory: "Form color palette",
      },
    },
    ["formStyle.tabColor"]: {
      control: "color",
      defaultValue: "#000",
      table: {
        category: "Styling",
        subCategory: "Form color palette",
      },
    },
    ["formStyle.qrCodeBackground"]: {
      control: "color",
      defaultValue: "#000",
      table: {
        category: "Styling",
        subCategory: "Form color palette",
      },
    },
    ["formStyle.highlightColor"]: {
      control: "color",
      defaultValue: "#000",
      table: {
        category: "Styling",
        subCategory: "Form color palette",
      },
    },
    ["formStyle.inputBackground"]: {
      control: "color",
      defaultValue: "#000",
      table: {
        category: "Styling",
        subCategory: "Form color palette",
      },
    },
    ["formStyle.appBtn"]: {
      control: "color",
      defaultValue: "#000",
      table: {
        category: "Styling",
        subCategory: "Form color palette",
      },
    },
    clientSdkApiKey: {
      type: {
        name: "string",
        required: true,
      },
      defaultValue:
        "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjhiNzhkYTFmLWU4NWEtNDg4Ny05MmQxLTcyNWZlNTg3MGFiZCJ9.eyJrZXkiOiJXbXhCN1g2TVhGM3BtZEJWUnNIYkVuaHZZN3M1NVVzQkdkTlBiRTdmdkU3VmlSU0wiLCJpYXQiOjE2NTUxNDg5NTh9.d2enMoOLTUeC-9NegdJHn0Xh5AGx8uQ1R68tVAGs0pMTDGf58BCBleeC2w16bmF0hAqui94EcmCX8KSoKhzmiA",
      description:
        "(Required) Your project's API Key, make sure the current domain you're testing in is allowed in the AuthArmor Dashboard",
    },
    webauthnClientId: {
      type: {
        name: "string",
        required: false,
      },
      description:
        "(Optional) Client ID for WebAuthn, required to enable using WebAuthn as an auth method",
    },
    registerRedirectUrl: {
      type: {
        name: "string",
        required: false,
      },
      description:
        "(Optional) Redirect route that will be specified for Magic Link Registration emails, required for enabling Magic Link",
    },
    authenticationRedirectUrl: {
      type: {
        name: "string",
        required: false,
      },
      description:
        "(Optional) Redirect route that will be specified for Magic Link Authentication emails, required for enabling Magic Link",
    },
    onAuthSuccess: {
      description: "",
    },
    onRegisterSuccess: {},
  },
};

export const Form = ({ ...args }) => {
  const unflattenedArgs = unflatten(args, {
    delimiter,
  });
  return (
    <AuthArmor
      onAuthSuccess={() => console.log("Login success!")}
      onRegisterSuccess={() => console.log("Register success!")}
      {...unflattenedArgs}
    />
  );
};
