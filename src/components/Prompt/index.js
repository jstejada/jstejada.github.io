import React from 'react';
import { css } from 'emotion';
import { colors } from '../../constants';

const promptCss = css`
  color: ${colors.oceanic.teal};
  display: inline-block;
  transform: translateY(-2px);
`;

const inversePromptCss = css`
  ${promptCss};
  transform: rotate(180deg) translateY(-2px);
`;

export default function Prompt({ inverse = false } = {}) {
  return <span className={inverse ? inversePromptCss : promptCss}>❯</span>;
}
