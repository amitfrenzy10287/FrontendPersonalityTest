import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    border-radius: 4px;
    background-color: #ec5169;
    border: none;
    color: white;
    outline: none;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    margin:10px;
    padding:10px 30px 10px 30px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    &.disabled {
    	color: #ccc;
    	cursor: not-allowed;
    }
    @media (max-width: 1023px) {
	    width:100%;
        margin:10px 0;
	}
`;

const button = (props) => (
    <Button
        disabled={props.disabled}
        onClick={props.clicked}>{props.children}</Button>
);

export default button;