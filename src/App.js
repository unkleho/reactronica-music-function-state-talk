import React from 'react';
import {
  Deck,
  Slide,
  // Appear,
  CodePane,
  // Image,
  Heading as RawHeading,
  List as RawList,
  ListItem as RawListItem,
  // Quote,
  // Text,
  // Notes,
  // MarkdownSlides,
  // ComponentPlayground,
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
  margin-bottom: 0.5em;
  background: linear-gradient(160deg, #5f0fd1, #0fa6d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
      <Deck theme={theme} showFullscreenControl={false}>
        <Slide>
          <Heading>Reactronica</Heading>
        </Slide>

        <Slide>
          <Heading>About</Heading>
          <List>
            <ListItem>
              <strong>DX Lab Technical Lead</strong> at the{' '}
              <strong>State Library of NSW</strong>
            </ListItem>
            <ListItem>Studied (industrial) design many years ago</ListItem>
            <ListItem>
              Released electronic/hip hop music as <strong>Unkle Ho</strong> and
              with <strong>The Herd</strong>
            </ListItem>
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

        <Slide>
          <LiveProvider
            code={`() => {
  const synth = React.useRef();

  React.useEffect(() => {
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
            }}
            theme={{
              styles: [],
            }}
          >
            <LiveEditor className="prism-code" />
            <LiveError />
            <LivePreview />
          </LiveProvider>
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
