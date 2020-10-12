import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const FormInput = ({id, label, name, type, placeholder, handleOnChange, value}) => {
    return (
        <div className='FormInput'>
            <FormGroup>
                <Label for={id}>{label}</Label>
                <Input type={type} name={name} id={id} placeholder={placeholder} onChange={handleOnChange} value={value}/>
            </FormGroup>
        </div>
    )
}

export default FormInput;