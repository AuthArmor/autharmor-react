import type {
    AuthArmorFormCustomElementEvents,
    AuthArmorFormCustomElementProps
} from "@autharmor/autharmor-js-ui";
import {
    CSSProperties,
    ForwardedRef,
    HTMLAttributes,
    forwardRef,
    useImperativeHandle,
    useLayoutEffect,
    useRef
} from "react";
import { wrapWc } from "./wrapWc";

export type AuthArmorFormProps = AuthArmorFormCustomElementProps & AuthArmorFormCustomElementEvents;

const AuthArmorFormWc = wrapWc<AuthArmorFormProps>("autharmor-form");

export const AuthArmorForm = forwardRef(
    (
        props: AuthArmorFormProps & HTMLAttributes<any>,
        forwardedRef: ForwardedRef<HTMLElementTagNameMap["autharmor-form"]>
    ) => {
        const ref = useRef<HTMLElementTagNameMap["autharmor-form"]>(null);
        useImperativeHandle(forwardedRef, () => ref.current!, [ref.current]);

        useLayoutEffect(() => {
            if (ref.current === null) return;

            for (const styleKey in props.style) {
                (ref.current.style as any)[styleKey as keyof CSSProperties] = (props.style as any)[
                    styleKey
                ];
            }
        }, [ref.current, props.style]);

        return <AuthArmorFormWc ref={ref} {...props} />;
    }
);
