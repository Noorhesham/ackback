import {t} from "i18next";
import React, {ChangeEvent} from "react";
import Form from "react-bootstrap/Form";

interface CheckboxProps {
    OnChange?: (value: any, event: ChangeEvent<HTMLInputElement>) => void;
    Value?: boolean | undefined;
    Label?: string;
    Class?: string;
    Disabled?: boolean;
    ReadOnly?: boolean;
    Id?: string;
    Size?: number | undefined;
}

const initialCheckboxProps: CheckboxProps = {
    Class: "",
    Value: undefined,
    Size: undefined,
    Disabled: false,
    ReadOnly: false,
    Id: "check",
    Label: "",
};

export default function Checkbox(props: CheckboxProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let {value} = event.target;
        if (props.OnChange && typeof props.OnChange === "function") props.OnChange(value, event);
    };

    return (
        <Form.Check
            type="checkbox"
            className={`${props.Class}`}
            id={props.Id}
            label={props.Label && t(`${props.Label}`)}
            onChange={handleChange}
            disabled={props.Disabled}
            size={props.Size}
            readOnly={props.ReadOnly}
            checked={props.Value}
        />
    );
}
