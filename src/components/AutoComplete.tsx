import React, {useState, useEffect, ChangeEvent} from "react";
import "./Autocomplete.css";
import Input from "./Input";
import {Form} from "react-bootstrap";

interface AutocompleteProps {
    Label?: string;
    Options: {Key: string | number; Value: string}[];
    Class?: string;
    Model: string | number;
    Disabled?: boolean;
    OnChange?: (key: string | number, item: {Key: string | number; Value: string}, keyProp: string) => void;
    placeholder?: string;
    Icon?: any;
    OnEnterClicked?: (value: string) => void;
    DefaultValue?: string;
    containerClass?: string;
    OnBlur?: () => void;
    Min?: number;
    OnSearch?: (text: string) => void;
}

interface AutocompleteItem {
    Key: string | number;
    Value: string;
}

interface AutocompleteModel {
    item: any;
    searchItems: AutocompleteItem[];
    cursor: number;
    EnterClicked: boolean;
    selected: boolean;
}

const Autocomplete: React.FC<AutocompleteProps> = (props) => {
    const defaultItem: AutocompleteItem = {
        Key: "0",
        Value: props.DefaultValue || "",
    };

    const defaultModel: AutocompleteModel = {
        item: defaultItem,
        searchItems: [],
        cursor: -1,
        EnterClicked: false,
        selected: false,
    };

    const [model, setModel] = useState<AutocompleteModel>(defaultModel);

    useEffect(() => {
        let selectedItem = props.Options.find((item) => item.Key.toString() === model.item.Key.toString());
        setModel((old) => ({
            ...defaultModel,
            item: selectedItem !== undefined ? selectedItem : props.OnSearch && old.item.Value ? old.item : defaultItem,
            searchItems: old.EnterClicked || (props.OnSearch && old.item.Value) ? props.Options : [],
        }));
    }, [props.Options]);

    const selectedItemChanged = (item: AutocompleteItem) => {
        if (props.OnChange && typeof props.OnChange === "function")
            props.OnChange(item.Key, item, props.Model.toString());
    };

    useEffect(() => {
        defaultItem.Value = props.DefaultValue || "";
        setModel((old) => ({...defaultModel, item: {...old.item, Value: props.DefaultValue || ""}}));
    }, [props.DefaultValue]);

    useEffect(() => {
        let selectedItem = props.Options.find(
            (item) => props.Model && item.Key && item.Key.toString() === props.Model.toString()
        );
        if (selectedItem !== undefined) {
            setModel((oldModel) => ({...oldModel, selected: true, item: selectedItem, searchItems: []}));
            selectedItemChanged(selectedItem);
        } else {
            setModel((oldModel) => ({
                ...oldModel,
                selected: true,
                item: {Key: props.Model, Value: props.DefaultValue || ""},
                searchItems: [],
            }));
            selectedItemChanged({Key: props.Model, Value: props.DefaultValue || ""});
        }
    }, [props.Model]);

    const onInputFocus = () => {
        if (model.item.Value === "") {
            autocomplete();
        }
    };

    const autocomplete = (evt?: ChangeEvent<HTMLInputElement>) => {
        let text = evt ? evt.target.value : props.DefaultValue || "";
        let item = {Value: text, Key: 0};
        setModel((oldModel) => ({
            ...oldModel,
            item,
            searchItems:
                text.length < (props.Min || 0)
                    ? []
                    : props.Options.filter((r) => r.Value.toLowerCase().includes(text.toLowerCase())),
        }));
        if (props.OnSearch && typeof props.OnSearch === "function") props.OnSearch(text);
    };

    const close = () => {
        selectedItemChanged(model.selected ? model.item : defaultItem);
        setModel((oldModel) => {
            return {...oldModel, searchItems: [], item: model.selected ? oldModel.item : defaultItem};
        });
    };

    const hanldeKeydown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const {cursor, searchItems} = model;
        if (evt.keyCode === 38 && cursor > 0) {
            setModel((oldModel) => ({...oldModel, cursor: oldModel.cursor - 1}));
        } else if (evt.keyCode === 40 && cursor < searchItems.length - 1) {
            setModel((oldModel) => ({...oldModel, cursor: oldModel.cursor + 1}));
        } else if (evt.keyCode === 13) {
            let currentItem = searchItems[cursor];
            if (currentItem !== undefined) {
                setModel((oldModel) => ({...oldModel, item: currentItem, EnterClicked: true, searchItems: []}));
                selectedItemChanged(currentItem);
            } else {
                setModel((oldModel) => ({...oldModel, EnterClicked: true}));
                if (props.OnEnterClicked && typeof props.OnEnterClicked === "function")
                    props.OnEnterClicked(model.item.Value);
            }
        }
    };

    const renderOptions = () => {
        const {searchItems, cursor} = model;
        if (searchItems.length === 0) return null;
        return (
            <div className=" shadow rounded-bottom ">
                {searchItems.map((item, index) => (
                    <div
                        key={item.Key}
                        className={` px-2 py-1 option ${cursor === index ? "selected" : ""}`}
                        style={{cursor: "pointer"}}
                        onClick={() => handleOptionClick(item)}
                    >
                        {item.Value}
                    </div>
                ))}
            </div>
        );
    };

    const handleOptionClick = (item: AutocompleteItem) => {
        setModel((oldModel) => ({...oldModel, item, searchItems: [], selected: true, EnterClicked: false}));
        selectedItemChanged(item);
    };

    return (
        <div className={props.containerClass}>
            {props.Label && <label>{props.Label}</label>}
            <div className={`autocomplete-container d-flex ${props.Class || ""}`}>
                {/* <Input
                    Type="text"
                    Class="autocomplete-input"
                    Value={model.item.Value}
                    Placeholder={props.placeholder}
                    Disabled={props.Disabled}
                    OnChange={autocomplete}
                    OnKeyDown={hanldeKeydown}
                    OnFocus={onInputFocus}
                    OnBlur={props.OnBlur}
                    EndIcon={
                        <>
                            {model.item.Value && (
                                <button className="btn btn-danger p-0 m-0" onClick={close}>
                                    X
                                </button>
                            )}
                        </>
                    }
                /> */}
                <Form.Control
                    type="text"
                    className="autocomplete-input"
                    placeholder={props.placeholder}
                    disabled={props.Disabled}
                    value={model.item.Value}
                    onChange={(evt: any) => {
                        autocomplete(evt);
                    }}
                    onBlur={props.OnBlur}
                    onFocus={onInputFocus}
                    onKeyDown={hanldeKeydown}
                />
                {model.item.Value && (
                    <button className="btn btn-primary py-0 px-3" onClick={close}>
                        X
                    </button>
                )}
                {/* <input
                    type="text"
                    className="autocomplete-input"
                    value={model.item.Value}
                    placeholder={props.placeholder}
                    disabled={props.Disabled}
                    onChange={autocomplete}
                    onKeyDown={hanldeKeydown}
                    onFocus={onInputFocus}
                    onBlur={props.OnBlur}
                /> */}
            </div>
            {renderOptions()}
        </div>
    );
};

export default Autocomplete;
