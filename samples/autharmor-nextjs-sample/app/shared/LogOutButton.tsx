"use client";

import { ensureSuccessCode } from "@/lib/http/ensureSuccessCode";

export function LogOutButton(props: Omit<JSX.IntrinsicElements["button"], "onClick">) {
    const handleLogOut = async () => {
        const response = await fetch("/auth/log-out", {
            method: "POST"
        });
        ensureSuccessCode(response);

        window.location.href = "/";
    };

    return <button {...props} onClick={handleLogOut} />;
}
