import React, {MouseEvent} from "react";
import RBButton from "react-bootstrap/Button";
import {Placeholder} from "react-bootstrap";
import {t} from "i18next";

interface ButtonProps {
    OnClick?: (value: any, event: MouseEvent<HTMLButtonElement>) => void;
    Label?: string;
    Class?: string;
    Variant?: string;
    Size?: "sm" | "lg" | undefined;
    Type?: "button" | "submit" | "reset" | undefined;
    Style?: React.CSSProperties;
    Disabled?: boolean;
    Active?: boolean;
    StartIcon?: React.ReactNode;
    EndIcon?: React.ReactNode;
    ShowSkeleton?: boolean;
}
const initialButtonProps: ButtonProps = {
    Label: "",
    Class: "text-light",
    Variant: "",
    Size: undefined,
    Type: "button",
    Disabled: false,
    Active: false,
    ShowSkeleton: false,
};
export default function Button(props: ButtonProps = initialButtonProps) {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        let {value} = event.currentTarget;
        if (props.OnClick && typeof props.OnClick === "function") props.OnClick(value, event);
    };

    return props.ShowSkeleton ? (
        <>
            <Placeholder.Button className={`m-1 ${props.Class}`} aria-hidden="true">
                loading..
            </Placeholder.Button>
        </>
    ) : (
        <RBButton
            className={`m-1 px-2 ${props.Class}`}
            variant={props.Variant}
            size={props.Size}
            disabled={props.Disabled}
            active={props.Active}
            onClick={handleClick}
            type={props.Type}
            style={props.Style}
        >
            {props.StartIcon && props.StartIcon}
            {t(`${props.Label}`)}
            {props.EndIcon && props.EndIcon}
        </RBButton>
    );
}
