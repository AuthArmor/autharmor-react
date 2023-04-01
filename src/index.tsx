import React from "react";
import { render } from "react-dom";
import AuthArmorSDK from "./components/AuthArmorForm";

render(
  <AuthArmorSDK
    clientSdkApiKey="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjhiNzhkYTFmLWU4NWEtNDg4Ny05MmQxLTcyNWZlNTg3MGFiZCJ9.eyJrZXkiOiI0U3ZRc2lmRjR4Ykt6RUxhcVVZWGl1eWJ5bkt3Zm5NZFd6aWFOVzc5c3dpa3V3Q3IiLCJpYXQiOjE2ODAzNTY5MTd9.QjwypLZoWVgi2C5P0XaXY-v6mA-wyMhJwtE_L44DTWWJWFwiQo5ECH2UORQ1zZ0Gy7KWMs2_9Am1rCjYZH2-WQ"
    webauthnClientId="5ceb11dc-3337-44bd-9084-2730d5341f22"
    registerRedirectUrl={`${location.origin}/magic-register`}
    authenticationRedirectUrl={`${location.origin}/magic-login`}
    onAuthSuccess={() => console.log("Login success!")}
    onRegisterSuccess={() => console.log("Register success!")}
  />,
  document.getElementById("root")
);
