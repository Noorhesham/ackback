import React from "react";
import Form from "react-bootstrap/Form";

interface SelectProps {
  OnChange?: (value: string, options: any[], event: React.ChangeEvent<HTMLSelectElement>) => void;
  Options:Record<string, any>[];
  Label?: string;
  Key: string;
  KeyValue: string;
  Value: string | number;
  Placeholder?: string;
  HintText?: string;
  Class?: string;
  ContainerClass?: string;
  LabelClass?: string;
  Size?: "sm" | "lg" | undefined;
  Style?:any
  Type?: string;
  Disabled?: boolean;
  ReadOnly?: boolean;
}

const initialSelectProps: SelectProps = {
  Options: [],
  Value: "",
  Key: "id",
  KeyValue: "value", 
  // Provide a default value here
};


export default function Select(props: SelectProps = initialSelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (props.OnChange && typeof props.OnChange === "function") {
      props.OnChange(value, props.Options, event);
    }
  };

  return (
    <Form.Group className={props.ContainerClass}>
      {props.Label && <Form.Label className={props.LabelClass}>{props.Label}</Form.Label>}
      <Form.Select
        className={props.Class}
        size={props.Size}
        style={props.Style}
        placeholder={props.Placeholder}
        value={props.Value}
        onChange={handleChange}
        disabled={props.Disabled}
      >
        {props.Options.length > 0 &&
          props.Options.map((item: Record<string, any>) => {
            return (
              <option key={item[props.Key]} value={item[props.Key]}>
                {item[props.KeyValue]}
              </option>
            );
          })}
      </Form.Select>
    </Form.Group>
  );
}