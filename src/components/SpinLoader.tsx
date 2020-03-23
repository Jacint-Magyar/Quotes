import React from "react"
import styled, { keyframes } from 'styled-components';

function SpinLoader(props: {}) {
  return (
    <Spinner viewBox="0 0 50 50" {...props}>
      <circle cx={25} cy={25} r={20} fill="none" strokeWidth="4" />
    </Spinner>
  )
}

export default SpinLoader;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const Spinner = styled.svg`
  animation: ${rotate} 2s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  
  & > * {
    stroke: #fff;
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
  }
`;