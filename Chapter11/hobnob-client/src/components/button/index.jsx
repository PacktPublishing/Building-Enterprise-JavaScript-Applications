import React from 'react';

function Button(props) {
  return <button id={props.id} disabled={props.disabled}>{props.title}</button>
}

export default Button;
