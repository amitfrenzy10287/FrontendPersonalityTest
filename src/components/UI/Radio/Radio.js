import React from 'react';
import styled from 'styled-components';

const RadioBtn = styled.input`
	-webkit-appearance: none;
     -moz-appearance: none;
     appearance: none;
     display: inline-block;
     position: relative;
     background-color: #f1f1f1;
     color: #666;
     top: 10px;
     height: 30px;
     width: 30px;
     border: 0;
     border-radius: 50px;
     cursor: pointer;     
     margin-right: 7px;
     outline: none;
     &:checked::before {
	     position: absolute;
	     font: 13px/1 'Open Sans', sans-serif;
	     left: 11px;
	     top: 7px;
	     content: '\\02143';
	     transform: rotate(40deg);
	 }
	&:hover
	{
     background-color: #f7f7f7;
 	}
 	&:checked
	{
	     background-color: #f1f1f1;
	}
	&
`;

const Label = styled.label`
	 color: #666;
	 cursor: pointer;
`;

const Radio = (props) =>{
	
	const {name, value, checked, change, label } = props;

	return(
		<div>
			<RadioBtn type="radio" name={name}
			 value={value} 
			  checked={checked}
			  onChange={change} />
			<Label>{label}</Label>
		</div>
	);
}
export default Radio;