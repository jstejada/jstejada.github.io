import React from 'react';
import { css } from 'emotion';
import Messenger from '../components/Messenger';
import { colors } from '../constants';

const indexPageCss = css`
  font-size: 26px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colors.text.main};
`;

const IndexPage = () => (
  <div className={indexPageCss}>
    <Messenger />
  </div>
);

export default IndexPage;
