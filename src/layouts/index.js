import React from 'react';
import { css, keyframes } from 'emotion';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { colors } from '../constants';
import './index.css';

const headerCss = css`
  height: 105px;
  padding: 40px 50px;
`;

const underlineAnimationCss = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const navMenuItemCss = css`
  cursor: default;
  color: inherit;
  text-decoration: none;
  position: relative;
  display: inline-block;

  &:after {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 4px;
    height: 4px;
    background-color: ${colors.main.red};
    content: '';
    opacity: 0.5;

    /* Start animation */
    animation: ${underlineAnimationCss} 1s 1;
    animation-fill-mode: forwards;

    /* Hover animation */
    transition: transform 200ms, opacity 200ms, border-radius 200ms;
  }

  &:hover {
    &:after {
      transform: translateY(5px) scaleY(0.5);
      opacity: 1;
      border-radius: 2px;
    }
  }
`;

const contentCss = css`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  margin-top: -105px;
`;

const MainLayout = ({ children }) => (
  <div>
    <Helmet
      title="juan"
      meta={[
        { name: 'description', content: `Juan's Site` },
        { name: 'keywords', content: 'jstejada' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
      ]}
    />
    <div className={headerCss}>
      <div>
        <div className={navMenuItemCss} href="#">
          {' '}
          juan 🍂{' '}
        </div>
      </div>
    </div>
    <div className={contentCss}>{children()}</div>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.func,
};

export default MainLayout;
