import React from 'react';

function getIndicatorColor (state) {
  if (state.valid === null || state.value.length === 0) {
    return 'transparent';
  }
  return state.valid ? 'green' : 'red';
}

function Input (props) {
  return (
    <label>
      {props.label}
      <input id={props.id} type={props.type} value={props.value} onChange={(event) => props.onChange(props.name, event)}/>
      <div className="indicator" style={{
        height: "20px",
        width: "20px",
        backgroundColor: getIndicatorColor(props)
      }}></div>
    </label>
  )
}

export {
  Input as default,
  getIndicatorColor
}
