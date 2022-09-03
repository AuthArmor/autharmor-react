import React from "react";
import { render } from "react-dom";
import AuthArmorSDK from "./components/AuthArmorForm";

render(
  <AuthArmorSDK
    clientSdkApiKey="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjhiNzhkYTFmLWU4NWEtNDg4Ny05MmQxLTcyNWZlNTg3MGFiZCJ9.eyJrZXkiOiJXbXhCN1g2TVhGM3BtZEJWUnNIYkVuaHZZN3M1NVVzQkdkTlBiRTdmdkU3VmlSU0wiLCJpYXQiOjE2NTUxNDg5NTh9.d2enMoOLTUeC-9NegdJHn0Xh5AGx8uQ1R68tVAGs0pMTDGf58BCBleeC2w16bmF0hAqui94EcmCX8KSoKhzmiA"
    webauthnClientId="1bd515ee-c7d5-4e19-ba6e-348f9a785f19"
    registerRedirectUrl={`${location.origin}/magic-register`}
    authenticationRedirectUrl={`${location.origin}/magic-login`}
    onAuthSuccess={() => console.log("Login success!")}
    onRegisterSuccess={() => console.log("Register success!")}
  />,
  document.getElementById("root")
);
