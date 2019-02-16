import React from 'react';
import PropTypes from 'prop-types';
import { css, keyframes } from 'emotion';
import Typist from 'react-typist';
import Prompt from '../Prompt';
import Loading from '../Loading';
import { PERSON, BOT, LOADING } from '../../constants';

const messageCss = css`
  margin: 4px 0;
`;

const loadingMessageContainerCss = css`
  display: flex;
  alignitems: center;
`;

const personMessageCss = css`
  ${messageCss} text-align: right;
`;

function LoadingMessage() {
  return (
    <div className={messageCss}>
      <div className={loadingMessageContainerCss}>
        <Prompt /> <Loading />
      </div>
    </div>
  );
}

function Message({ type, text, onCharacterTyped }) {
  if (type === LOADING) {
    return <LoadingMessage />;
  }

  const isPerson = type === PERSON;
  const className = isPerson ? personMessageCss : messageCss;
  return (
    <div className={className}>
      {isPerson ? (
        <span>
          {text} <Prompt inverse />
        </span>
      ) : (
        <Typist
          avgTypingDelay={50}
          cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}
          onCharacterTyped={onCharacterTyped}
        >
          <Prompt /> {text}
        </Typist>
      )}
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.node,
  type: PropTypes.oneOf([PERSON, BOT, LOADING]),
};

const messageListCss = css`
  min-height: 50px;
`;

export default function MessageList({ messages, onCharacterTyped }) {
  return (
    <div className={messageListCss}>
      {messages.map((msg, idx) => (
        <Message
          {...msg}
          key={`MessageList-message(${idx})`}
          onCharacterTyped={onCharacterTyped}
        />
      ))}
    </div>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape(Message.propTypes)),
};
