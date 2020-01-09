import React from 'react';
import { render } from 'react-dom';
import styled from 'react-emotion';

import {
  Deck,
  Slide,
  Appear,
  CodePane,
  // FlexBox,
  // Box,
  Image,
  Heading as RawHeading,
  List as RawList,
  ListItem as RawListItem,
  // OrderedList,
  Quote,
  Text,
  // UnorderedList,
  // Grid,
  Notes,
  FullScreen,
  // Progress,
  Markdown,
} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';

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

// eslint-disable-next-line react/no-multi-comp
const Presentation = () => (
  <Deck
    showFullscreenControl={false}
    // autoLayout={true}
    theme={theme}
    // contentHeight="100%"
    // template={template}
  >
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

render(<Presentation />, document.getElementById('root'));
