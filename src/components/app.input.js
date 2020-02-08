import React from 'react';

const AppInput = (props) => {
  // app Input will handle only HTML5 validation, it will not work for custom validation
    console.log('AppInput');

    // one approch to handle validatinon inside child
    // let invalidErrorMsgClass = 'invalid-feedback';
    // if(props.required && !props.value) {
    //     invalidErrorMsgClass += ' show';
    // } else {
    //     invalidErrorMsgClass += '';
    // }

    // another way to override props value before asigning  to element
    // const updateHandler = (event) => {
    //     props.onChange(event);
    // }
    // let inputProps = {...props, onChange:updateHandler }; // we can pass inputProps on input element

    return ( 
    <div className="form-group">
        <label htmlFor={props.label}>{props.label}</label> : 
        <input type="text" {...props} className="form-control" placeholder="Enter Name"/>
        <div className='invalid-feedback'>Field is required.</div>
    </div> );
}

 
export default AppInput;