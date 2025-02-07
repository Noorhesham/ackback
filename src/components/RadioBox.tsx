import {t} from "i18next"; 
import React, {ChangeEvent} from "react"; 
import Form from "react-bootstrap/Form"; 
 
interface RadioProps { 
    OnChange?: (value: any, event: ChangeEvent<HTMLInputElement>) => void; 
    Value?: boolean | undefined; 
    Label?: string; 
    Class?: string; 
    Disabled?: boolean; 
    ReadOnly?: boolean; 
    Id?: string; 
    Size?: number | undefined; 
} 
 
const initialRadioProps: RadioProps = { 
    Class: "", 
    Value: undefined, 
    Size: undefined, 
    Disabled: false, 
    ReadOnly: false, 
    Id: "radio", 
    Label: "", 
}; 
 
export default function RadioBox(props: RadioProps=initialRadioProps) { 
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => { 
        let {value} = event.target; 
        if (props.OnChange && typeof props.OnChange === "function") props.OnChange(value, event); 
    }; 
 
    return ( 
        <>
                 <Form.Check 
            type="radio" 
            className={props.Class} 
            id={props.Id} 
            label={props.Label && t(props.Label)} 
            onChange={handleChange} 
            disabled={props.Disabled} 
            size={props.Size} 
            readOnly={props.ReadOnly} 
            checked={props.Value} 
        />
        </>
        // <Form.Check 
        //     type="radio" 
        //     className={${props.Class}} 
        //     id={props.Id} 
        //     label={props.Label && t(${props.Label})} 
        //     onChange={handleChange} 
        //     disabled={props.Disabled} 
        //     size={props.Size} 
        //     readOnly={props.ReadOnly} 
        //     checked={props.Value} 
        // /> 
    ); 
}