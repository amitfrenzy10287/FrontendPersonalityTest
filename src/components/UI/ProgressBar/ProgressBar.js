import React from 'react';

import styled from 'styled-components';

const Progress = styled.div`
  background-color: lightgray;
  border-radius: 1.25em;
  width: 100%;
  height: 16px;
  display: inline-block;
  color:#ffffff;
  font-weight: bold;
  font-size: 12px;
  @media(max-width: 1023px){
    margin: 1%;
    width: 98%;
  }
  `;

const ProgressValue = styled.span`
  background-color: #ec5169;
  transition: 1s all linear;
  border-radius: 1.25em;
  height: 16px;
  display: inline-block;
  text-align: center;
  padding-left: 10px;
`;

const ProgressBar = (props)=>{
	
	const {barWidth} = props;

	return(
		<div>
			<Progress>
			   <ProgressValue style={{ width: `${barWidth}%` }}>{barWidth}%</ProgressValue> 
			</Progress>
		</div>
	);
}

export default ProgressBar;