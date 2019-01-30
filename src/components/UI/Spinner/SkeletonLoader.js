import React from 'react';
import styled, { keyframes } from 'styled-components';

const Progress = keyframes`
    0% {
        background-position: 0% 50%;
    }
        50% {
            background-position: 100% 50%;
    }
        100% {
            background-position: 0% 50%;
    }
`;

const Skeleton = styled.div`
    position: relative;
    overflow: hidden;
    margin-top: ${(props) => props.marginTop}px;
    margin-bottom: ${(props) => props.marginBottom}px;
    width: ${(props) => props.width}%;
    height: ${(props) => props.height}px;
    background: #ccc;
    border-bottom-left-radius:3px;
    border-top-left-radius:3px;
    
        display: block;
        background-image: linear-gradient(270deg, #fcfcfc, #d8d8d8);
        background-size: 400% 100%;
        animation: ${Progress} 3s ease infinite;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;


const SkeletonLoader = (props) =>{
	return(
		<Wrapper>
			<Skeleton marginTop={8} width={20} height={15} />
			<Skeleton marginTop={8} width={50} height={15} />
			<Skeleton marginTop={8} width={40} height={15} />
			<Skeleton marginTop={8} width={29} height={15} />
			<Skeleton marginTop={8} width={15} height={15} />
			<Skeleton marginTop={8} width={40} height={15} />
			<Skeleton marginTop={8} width={50} height={15} />
			<Skeleton marginTop={8} width={50} height={15} />
		</Wrapper>
	);

}
export default SkeletonLoader;