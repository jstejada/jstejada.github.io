import React from 'react';
import PropTypes from 'prop-types';
import Typist from 'react-typist';
import { pickRandom } from '../../utils';
import Bold from '../Bold';
import Prompt from '../Prompt';
import 'react-typist/dist/Typist.css';

const greetings = [
  'Hey people!',
  'Hi humans!',
  'Hola folks!',
  'Hello beings!',
  'Hola amigos!',
  'Hola friends!',
  'Greetings replicants!',
  'Glad to see you made it!',
  // 'Glad to see you made it, Mark!',
  // 'Glad to see you made it, Jackie!',
  // 'Glad to see you made it, Ben!',
  // 'Glad to see you made it, Evan!',
  `Who's there?`,
  `Who's here?`,
  'Qué onda?',
];

export default function Greeting({ onGreetingDone }) {
  const typistProps = {
    startDelay: 4500,
    avgTypingDelay: 80,
    onTypingDone: onGreetingDone,
    cursor: { hideWhenDone: true, hideWhenDoneDelay: 2000 },
  };
  const greeting = pickRandom(greetings);

  return (
    <div>
      <Typist {...typistProps}>
        <Prompt /> <Bold>{greeting} 👋</Bold>
        <Typist.Delay ms={700} /> I'm juan.<Typist.Delay ms={1000} />
        <br />
        <Prompt /> Talk to me...
      </Typist>
    </div>
  );
}

Greeting.propTypes = {
  onGreetingDone: PropTypes.func,
};
