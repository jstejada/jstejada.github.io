import React from 'react';
import { css } from 'emotion';

const boldCss = css`
  font-weight: 600;
`;
export default function Bold({ children }) {
  return <span className={boldCss}>{children}</span>;
}
