import React from "react";

import cn from "classnames";

import s from "./button.module.css";

type ButtonProps = {
    label: string;
    disabled?: boolean;
    onPress: React.MouseEventHandler<HTMLButtonElement>;
    size?: "small" | "medium" | "large";
};

const Button: React.FC<ButtonProps> = ({ label, disabled = false, onPress, size = "small" }) => (
    <button
        className={cn(s.button, s.ripple, s[`button__${size}`])}
        type="button"
        aria-label={label}
        disabled={disabled}
        onClick={onPress}>
        {label}
    </button>
);

export default Button;
