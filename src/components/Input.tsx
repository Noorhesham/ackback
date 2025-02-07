import React, {ChangeEvent, ElementType} from "react";
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";
import {t} from "i18next";

interface InputProps {
    OnChange?: (value: any, event: ChangeEvent<HTMLInputElement>) => void;
    OnClick?: (value: any, event: ChangeEvent<HTMLInputElement>) => void;
    OnKeyDown?: (value: any, event: ChangeEvent<HTMLInputElement>) => void;
    OnBlur?: (value: any, event: ChangeEvent<HTMLInputElement>) => void;
    OnFocus?: (value: any, event: ChangeEvent<HTMLInputElement>) => void;
    Value?: string | number | string[] | undefined;
    Label?: string;
    ShowAs?: ElementType<any>;
    Placeholder?: string;
    HintText?: string;
    Class?: string;
    ContainerClass?: string;
    InputGroupClass?: string;
    LabelClass?: string;
    Size?: "sm" | "lg" | undefined;
    Type?: string;
    Rows?: number;
    Min?: number;
    Disabled?: boolean;
    ReadOnly?: boolean;
    StartIcon?: React.ReactNode;
    EndIcon?: React.ReactNode;
    StartIconClass?: string;
    Required?: boolean;
    Style?: any;
    AutoFocus?: boolean;
}

const initialInputProps: InputProps = {
    Class: "shadow-sm",
    Value: "",
    ContainerClass: "my-2",
    LabelClass: "",
    Placeholder: "",
    Size: undefined,
    Type: "",
    Disabled: false,
    ReadOnly: false,
    Required: false,
    StartIconClass: "",
    Rows: 3,
    AutoFocus: false,
};

export default function Input(props: InputProps = initialInputProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let {value} = event.target;
        if (props.OnChange && typeof props.OnChange === "function") props.OnChange(value, event);
    };
    const handleClick = (event: any) => {
        let {value} = event.target;
        if (props.OnClick && typeof props.OnClick === "function") props.OnClick(value, event);
    };

    const handleKeyDown = (event: any) => {
        let {value} = event.target;
        if (props.OnKeyDown && typeof props.OnKeyDown === "function") props.OnKeyDown(value, event);
    };

    const handleBlur = (event: any) => {
        let {value} = event.target;
        if (props.OnBlur && typeof props.OnBlur === "function") props.OnBlur(value, event);
    };

    const handleFocus = (event: any) => {
        let {value} = event.target;
        if (props.OnFocus && typeof props.OnFocus === "function") props.OnFocus(value, event);
    };

    return (
        <Form.Group className={props.ContainerClass} controlId={"control_" + props.Label}>
            {props.Label && <Form.Label className={props.LabelClass}>{t(`${props.Label}`)}</Form.Label>}
            <InputGroup onClick={handleClick} className={props.InputGroupClass} hasValidation>
                {props.StartIcon && (
                    <InputGroup.Text className={"m-0 p-0 " + props.StartIconClass}>{props.StartIcon}</InputGroup.Text>
                )}
                <Form.Control
                    autoFocus={props.AutoFocus}
                    required={props.Required}
                    as={props.ShowAs && props.ShowAs}
                    rows={props.Rows}
                    style={props.Style}
                    min={props.Min}
                    size={props.Size}
                    type={props.Type}
                    className={props.Class}
                    placeholder={props.Placeholder ? t(`${props.Placeholder}`) : ""}
                    disabled={props.Disabled}
                    readOnly={props.ReadOnly}
                    value={props.Value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onKeyDown={handleKeyDown}
                />
                {props.EndIcon && <InputGroup.Text>{props.EndIcon}</InputGroup.Text>}
            </InputGroup>
            {props.HintText && <Form.Text>{props.HintText}</Form.Text>}
        </Form.Group>
    );
}
