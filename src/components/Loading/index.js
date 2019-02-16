import React from 'react';
import { css, keyframes } from 'emotion';
import { colors } from '../../constants';

const bounceDelayAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
`;

const loadingSpinnerCss = css`
  width: 70px;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const bounceCss = css`
  margin-right: 10px;
  width: 9px;
  height: 9px;
  background-color: ${colors.text.main};
  opacity: 0.8;

  animation: ${bounceDelayAnimation} 2.25s infinite ease-in-out both;
`;

const bounce1Css = css`
  ${bounceCss};
  animation-delay: -0.32s;
`;

const bounce2Css = css`
  ${bounceCss};
  animation-delay: -0.16s;
`;

export default function Loading() {
  return (
    <span className={loadingSpinnerCss}>
      <div className={bounce1Css} />
      <div className={bounce2Css} />
      <div className={bounceCss} />
    </span>
  );
}
