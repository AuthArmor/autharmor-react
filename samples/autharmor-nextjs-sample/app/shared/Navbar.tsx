"use client";

import { useState } from "react";
import Link from "next/link";
import cn from "clsx";

export function Navbar() {
    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => setIsActive(isActive => !isActive);

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" href="/">
                    <img src="/img/logo.png" width="28" height="28" />
                    <p className="has-text-weight-bold ml-1">AuthArmor Next.JS Sample</p>
                </Link>

                <button
                    role="button"
                    className={cn("navbar-burger", { "is-active": isActive })}
                    aria-label="menu"
                    aria-expanded={isActive}
                    onClick={toggleActive}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>

            <div className={cn("navbar-menu", { "is-active": isActive })}>
                <div className="navbar-start">
                    <Link className="navbar-item" href="/">
                        Home
                    </Link>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link className="button is-primary" href="/sign-up-log-in">
                                <strong>Sign up or log in</strong>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
