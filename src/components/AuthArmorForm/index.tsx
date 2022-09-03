import React, { useEffect, useRef, useState } from "react";
import AuthArmorSDK, {
  AuthMethods,
  FormPreferences,
  FormStyles,
} from "autharmor-sdk";
import StylePropTypes from "react-style-proptype";
import PropTypes from "prop-types";
import "./css/Form.css";

interface Props {
  formContainerStyle?: React.CSSProperties;

  formStyle?: FormStyles;
  usernameless?: boolean;
  visualVerify?: boolean;
  preferences?: FormPreferences;
  methods?: AuthMethods[];

  clientSdkApiKey: string;
  webauthnClientId?: string;
  registerRedirectUrl?: string;
  authenticationRedirectUrl?: string;
  onAuthSuccess?: (data: any) => void | Promise<void>;
  onRegisterSuccess?: (data: any) => void | Promise<void>;
}

const AuthArmor: React.FC<Props> = ({
  // Component settings
  formContainerStyle,

  // Form options
  formStyle,
  usernameless,
  visualVerify,
  preferences,
  methods,

  // SDK Config
  clientSdkApiKey,
  webauthnClientId,
  registerRedirectUrl,
  authenticationRedirectUrl,
  onAuthSuccess,
  onRegisterSuccess,
}) => {
  const [id, setId] = useState("");
  const [mounted, setMounted] = useState(false);
  const formRef = useRef();
  const SDKInstance = useRef<AuthArmorSDK>();

  useEffect(() => {
    const id = Math.random().toString(16).slice(2);

    setId(`autharmor-form-${id}`);
  }, []);

  useEffect(() => {
    try {
      if (id) {
        const instance = new AuthArmorSDK({
          clientSdkApiKey,
          webauthnClientId,
          registerRedirectUrl,
          authenticationRedirectUrl,
        });

        SDKInstance.current = instance;

        instance.form.mount(`#${id}`, {
          styles: formStyle,
          methods,
          usernameless,
          visualVerify,
          preferences,
        });

        return () => {
          instance.destroy();
          SDKInstance.current = null;
        };
      }
    } catch (err) {
      alert("AuthArmor SDK: " + err.message);
      console.error(err);

      return () => {
        if (SDKInstance.current) {
          SDKInstance.current.destroy();
          SDKInstance.current = null;
        }
      };
    }
  }, [
    id,
    mounted,
    usernameless,
    visualVerify,
    preferences,
    methods,

    // SDK Config
    clientSdkApiKey,
    webauthnClientId,
    registerRedirectUrl,
    authenticationRedirectUrl,
  ]);

  useEffect(() => {
    if (SDKInstance.current && formStyle) {
      SDKInstance.current.form.stylize(formStyle);
    }

    if (SDKInstance.current) {
      if (onAuthSuccess) {
        SDKInstance.current.on("authSuccess", onAuthSuccess);
      }

      if (onRegisterSuccess) {
        SDKInstance.current.on("registerSuccess", onRegisterSuccess);
      }
    }
  }, [formStyle, SDKInstance.current, onAuthSuccess, onRegisterSuccess]);

  if (!id) {
    return null;
  }

  return (
    <div
      className="autharmor-form-container"
      style={formContainerStyle}
      ref={formRef}
      id={id}
    />
  );
};

AuthArmor.propTypes = {
  formContainerStyle: StylePropTypes,
};

export default AuthArmor;
