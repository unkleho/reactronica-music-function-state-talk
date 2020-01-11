import React from 'react';
import {
  Deck,
  Slide,
  Appear,
  CodePane,
  // Image,
  Heading as RawHeading,
  List as RawList,
  ListItem as RawListItem,
  // Quote,
  Text as RawText,
  Notes,
} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import styled from 'react-emotion';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Tone from 'tone';

import './App.css';
import './code-pane.scss';

const theme = createTheme(
  {
    primary: '#131313',
    secondary: '#ccc',
  },
  {
    primary: 'Inter UI, sans-serif',
  }
);

// ----------------------------------------------------------------------------
// Styled Components
// ----------------------------------------------------------------------------

const Heading = styled(RawHeading)`
  margin-bottom: 64px;
  background: linear-gradient(160deg, #5f0fd1, #0fa6d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SubHeading = styled(RawHeading)`
  color: #ccc;
  font-weight: 600;
`;

const Text = styled(RawText)`
  color: #ccc;
`;

const List = styled(RawList)`
  list-style-position: outside;
`;

const ListItem = styled(RawListItem)`
  margin-bottom: 1em;
  line-height: 1.4;
`;

function App() {
  return (
    <div className="App">
      <Deck theme={theme} showFullscreenControl={false} progress="bar">
        <Slide>
          <Heading>Reactronica</Heading>
          <SubHeading size={5}>Music as a Function of State</SubHeading>
        </Slide>

        <Slide>
          <Heading>About</Heading>
          <List>
            <ListItem>
              <strong>DX Lab Technical Lead</strong> at the{' '}
              <strong>State Library of NSW</strong>
            </ListItem>
            <Appear>
              <ListItem>Background in (industrial) design</ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Released electronic/hip hop music as <strong>Unkle Ho</strong>{' '}
                and with <strong>The Herd</strong>
              </ListItem>
            </Appear>
          </List>
        </Slide>

        <Slide>
          <Heading size={3}>UI as a Function of State</Heading>
          <List>
            <ListItem>
              React popularised rendering predictable markup from functions
            </ListItem>
            <ListItem>UI = f(state)</ListItem>
            <ListItem>
              HTML: <strong>React DOM</strong>
            </ListItem>
            <ListItem>
              Mobile App: <strong>React Native</strong>
            </ListItem>
          </List>

          <Notes>
            We are at a React conference, so we know this already...
          </Notes>
        </Slide>

        <Slide>
          <Heading size={3}>???? as a Function of State</Heading>
          <List>
            <ListItem>
              VR: <strong>React VR</strong>
            </ListItem>
            <ListItem>
              3D: <strong>React Three Fiber</strong>
            </ListItem>
            <ListItem>
              Command Line: <strong>Ink</strong>
            </ListItem>
            <ListItem>
              More at{' '}
              <a href="https://github.com/chentsulin/awesome-react-renderer">
                github.com/chentsulin/awesome-react-renderer
              </a>
            </ListItem>
          </List>

          <Notes>Ask audience for examples</Notes>
        </Slide>

        <Slide>
          <Heading size={3}>Music as a Function of State</Heading>
          <List>
            <ListItem>
              Apply <strong>React's</strong> declarative programming to{' '}
              <strong>music</strong>
            </ListItem>
            <ListItem>
              <strong>Music</strong> changes whenever <strong>state</strong>{' '}
              changes
            </ListItem>
            <ListItem>
              <strong>UI</strong> and <strong>music</strong> share the same
              state, so always kept in sync
            </ListItem>
          </List>
        </Slide>

        <Slide>
          <SubHeading size={5}>Introducing</SubHeading>
          <Heading>Reactronica</Heading>
          <Text>Music = f(state)</Text>
        </Slide>

        <Slide>
          <Heading size={3}>Reactronica</Heading>
          <List>
            <ListItem>React components for making music</ListItem>
            <ListItem>My first library!</ListItem>
            <ListItem>Inspired by React Music</ListItem>
            <ListItem>Uses Tone JS under the hood</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={3}>Tone JS</Heading>
          <List>
            <ListItem>Powerful audio library for the web</ListItem>
            <ListItem>Imperative</ListItem>
            <ListItem>Class based</ListItem>
          </List>
        </Slide>

        <Slide
          contentStyles={{
            maxWidth: 1800,
          }}
        >
          <Heading size={6}>Tone JS + React</Heading>

          <div className="react-live">
            <LiveProvider
              code={`() => {
  const synth = useRef();

  useEffect(() => {
    synth.current = new Tone.Synth().toMaster();
  }, [])

  return (
    <button onClick={() => {
      synth.current.triggerAttackRelease('C3');
    }}>Play</button>
  )
}`}
              scope={{
                Tone,
                useRef: React.useRef,
                useState: React.useState,
                useEffect: React.useEffect,
              }}
              theme={{
                styles: [],
              }}
              language="jsx"
            >
              <LiveEditor className="prism-code react-live__editor" />
              <div className="react-live__preview-pane">
                <LiveError className="react-live__error" />
                <LivePreview className="react-live__preview" />
              </div>
            </LiveProvider>
          </div>
        </Slide>

        <Slide>
          <Heading size={3}>Reactronica API</Heading>
          <List>
            <ListItem>Modelled on how modern DAWs work</ListItem>
            <ListItem>Show Ableton Image</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={3}>Components</Heading>
          <List>
            <ListItem>Song</ListItem>
            <ListItem>Track</ListItem>
            <ListItem>Instrument</ListItem>
            <ListItem>Effect</ListItem>
          </List>
        </Slide>

        <Slide>
          <CodePane
            lang="jsx"
            source={`const Test = () => {
  return (
    <div>Hello</div>
  )
}`}
            style={{
              fontSize: 32,
            }}
            theme="external"
          ></CodePane>
        </Slide>

        {/* Causes browser to hang, not sure what is going on */}
        {/* <Slide>
          <ComponentPlayground
            theme="dark"
            code={`const Button = ({ title }) => <button type="button">{title}</button>;
            render(<Button title="My Button" />);`}
          ></ComponentPlayground>
        </Slide> */}
      </Deck>
    </div>
  );
}

export default App;
