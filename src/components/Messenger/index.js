import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { css, keyframes } from 'emotion';
import debounce from 'lodash.debounce';
import { PERSON, BOT, LOADING, API_SERVER, colors } from '../../constants';
import Greeting from '../Greeting';
import Prompt from '../Prompt';
import MessageList from '../MessageList';

const ActionTypes = {
  GREETING_DONE: 'GREETING_DONE',
  CHANGE_INPUT: 'CHANGE_INPUT',
  CLEAR_INPUT: 'CLEAR_INPUT',
  ADD_PERSON_MESSAGE: 'ADD_PERSON_MESSAGE',
  ADD_BOT_MESSAGE: 'ADD_BOT_MESSAGE',
  ADD_LOADING_MESSAGE: 'ADD_LOADING_MESSAGE',
};

function getNextState(action, state) {
  switch (action.type) {
    case ActionTypes.GREETING_DONE: {
      return { isGreetingDone: true };
    }
    case ActionTypes.CHANGE_INPUT: {
      return { inputValue: action.payload };
    }
    case ActionTypes.CLEAR_INPUT: {
      return { inputValue: '' };
    }
    case ActionTypes.ADD_PERSON_MESSAGE: {
      const { inputValue, messages } = state;
      return {
        messages: [
          ...messages.filter(m => m.type !== LOADING),
          {
            id: Date.now(),
            type: PERSON,
            text: action.payload,
          },
        ],
      };
    }
    case ActionTypes.ADD_BOT_MESSAGE: {
      const { inputValue, messages } = state;
      return {
        messages: [
          ...messages.filter(m => m.type !== LOADING),
          {
            id: Date.now(),
            type: BOT,
            text: action.payload,
          },
        ],
      };
    }
    case ActionTypes.ADD_LOADING_MESSAGE: {
      const { inputValue, messages } = state;
      return {
        messages: [
          ...messages,
          {
            id: Date.now(),
            type: LOADING,
          },
        ],
      };
    }
    default:
      return state;
  }
}

function addPersonMessage(message) {
  return {
    type: ActionTypes.ADD_PERSON_MESSAGE,
    payload: message,
  };
}

function addBotMessage(message) {
  return {
    type: ActionTypes.ADD_BOT_MESSAGE,
    payload: message,
  };
}

function addLoadingMessage() {
  return {
    type: ActionTypes.ADD_LOADING_MESSAGE,
  };
}

function setGreetingIsDone() {
  return { type: ActionTypes.GREETING_DONE };
}

function clearInput() {
  return { type: ActionTypes.CLEAR_INPUT };
}

function isLoading(state) {
  return state.messages.find(m => m.type === LOADING);
}

const makeVisibleAnimation = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const messengerCss = css`
  width: 500px;
  border-radius: 5px;
  padding: 15px 20px;

  opacity: 0;
  animation: ${makeVisibleAnimation} ease-in 0.5s 1;
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
`;

const messengerInnerContainerCss = css`
  height: 200px;
  overflow: hidden;
`;

const chatInputCss = css`
  width: 100%;
  border-top: rgba(43, 48, 59, 0.5) solid 1px;
  opacity: 0;
  margin-top: 10px;

  input {
    background-color: transparent;
    border: none;
    padding-top: 10px;
  }
`;

const chatInputReadyCss = css`
  ${chatInputCss};
  animation: ${makeVisibleAnimation} ease-in 1.5s 1;
  animation-fill-mode: forwards;
  animation-delay: 1s;
`;

export default class Messenger extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      inputValue: '',
      isGreetingDone: false,
    };
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  update(actions, afterUpdate) {
    const actionsToDispatch = Array.isArray(actions) ? actions : [actions];
    this.setState(state => {
      // console.log('---> actions', actionsToDispatch);
      const nextState = actionsToDispatch.reduce(
        (accum, action) => ({ ...accum, ...getNextState(action, accum) }),
        state
      );
      // console.log('---> current', state);
      // console.log('---> next', nextState);
      return nextState;
    }, afterUpdate);
  }

  async fetchBotReply(inputValue) {
    try {
      // TODO use input
      this.update(addLoadingMessage());
      const response = await fetch(`${API_SERVER}/hi`);
      const json = await response.json();
      const message = json.reply;
      this.update(addBotMessage(message));
    } catch (e) {
      console.error(e);
      this.update(addBotMessage('Boo, I crashed 😔'));
    }
  }

  scrollToBottom = debounce(() => {
    if (!this._messagesContainer) {
      return;
    }
    this._messagesContainer.scrollTop = this._messagesContainer.scrollHeight;
  }, 10);

  onInputKeyDown = event => {
    if (['Enter', 'Return'].includes(event.key)) {
      if (isLoading(this.state)) {
        return;
      }
      const { inputValue } = this.state;
      this.update([clearInput(), addPersonMessage(inputValue)]);
      this.fetchBotReply(inputValue);
    }
  };

  onInputChange = event => {
    this.update({
      type: ActionTypes.CHANGE_INPUT,
      payload: event.target.value,
    });
  };

  onGreetingDone = () => {
    if (!this._input) {
      return;
    }
    findDOMNode(this._input).focus();
    this.update(setGreetingIsDone());
  };

  render() {
    const { isGreetingDone, messages, inputValue } = this.state;
    const inputCss = isGreetingDone ? chatInputReadyCss : chatInputCss;

    return (
      <div className={messengerCss}>
        <div
          className={messengerInnerContainerCss}
          ref={node => {
            this._messagesContainer = node;
          }}
        >
          <Greeting onGreetingDone={this.onGreetingDone} />
          <MessageList
            messages={messages}
            onCharacterTyped={this.scrollToBottom}
          />
        </div>
        <div className={inputCss}>
          <span>
            <Prompt />{' '}
          </span>
          <input
            ref={node => {
              this._input = node;
            }}
            type="text"
            value={inputValue}
            onChange={this.onInputChange}
            onKeyDown={this.onInputKeyDown}
          />
        </div>
      </div>
    );
  }
}
