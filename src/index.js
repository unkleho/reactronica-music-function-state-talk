import React from 'react';
import { render } from 'react-dom';
import styled from 'react-emotion';
import {
  Deck,
  Slide,
  Appear,
  CodePane,
  Image,
  Heading as RawHeading,
  List as RawList,
  ListItem as RawListItem,
  Quote,
  Text,
  Notes,
  FullScreen,
  MarkdownSlides,
  // ComponentPlayground,
} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import Tone from 'tone';

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

const testCode = `
const Button = ({ title }) => <button type="button">{title}</button>;
render(<Button title="My Button" />);
`;

// eslint-disable-next-line react/no-multi-comp
const Presentation = () => (
  <Deck showFullscreenControl={false} theme={theme}>
    <Slide>
      <Heading>Reactronica:</Heading>
      <Heading>Music as a Function of State</Heading>
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
        fontSize={18}
        language="javascript"
        autoFillHeight
        // source={require('raw-loader!./code.example')}
      >
        {`test`}
      </CodePane>
    </Slide>

    {MarkdownSlides`
      ### First MD generated Slide
      ---
      ### Second MD Generated Slide
    `}

    <Slide>
      <ToneExample></ToneExample>
    </Slide>

    {/* Not working for some reason - Chrome hangs */}
    {/* <Slide>
      <ComponentPlayground
        theme="dark"
        code={`const Button = ({ title }) => <button type="button">{title}</button>;
render(<Button title="My Button" />);`}
      ></ComponentPlayground>
    </Slide> */}

    {/* 
    <Slide>
      <CodePane fontSize={18} language="cpp" autoFillHeight>
        {cppCodeBlock}
      </CodePane>
      <Text>Lots of pointers!</Text>
    </Slide>
    <Markdown containsSlides>
      {`
        ### First MD generated Slide
        Notes: These are notes
        ---
        ### Second MD Generated Slide
        Notes: These are more notes
      `}
    </Markdown> */}
  </Deck>
);

const ToneExample = () => {
  const synth = React.useRef();

  React.useEffect(() => {
    synth.current = new Tone.Synth().toMaster();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          if (synth && synth.current) {
            synth.current.triggerAttackRelease('C3');
          }
        }}
      ></button>
    </div>
  );
};

render(<Presentation />, document.getElementById('root'));
