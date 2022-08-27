import React, { useEffect, useRef, useState } from "react";
import AuthArmorSDK from "autharmor-sdk";
import StylePropTypes from "react-style-proptype";
import PropTypes from "prop-types";
import "./css/Form.css";

const AuthArmor = React.forwardRef(
  (
    {
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
    },
    ref
  ) => {
    const [id, setId] = useState();
    const [mounted, setMounted] = useState(false);
    const formRef = useRef();
    const SDKInstance = useRef();

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

          instance.form.mount(`#${id}`, {
            styles: formStyle,
            methods,
            usernameless,
            visualVerify,
            preferences,
          });

          SDKInstance.current = instance;
        }
      } catch (err) {
        alert("AuthArmor SDK: " + err.message);
        console.error(err);
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
      return;
    }

    return (
      <div
        className="autharmor-form-container"
        style={formContainerStyle}
        ref={formRef ?? ref}
        id={id}
      />
    );
  }
);

AuthArmor.propTypes = {
  formContainerStyle: StylePropTypes,
};

export default AuthArmor;
