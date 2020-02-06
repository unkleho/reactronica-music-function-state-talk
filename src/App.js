import React from 'react';
import {
  Deck,
  Slide,
  Appear,
  // CodePane,
  // Image,
  Heading as RawHeading,
  List as RawList,
  ListItem as RawListItem,
  // Quote as RawQuote,
  Text as RawText,
  Notes,
} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import styled from 'react-emotion';
import CodeSlide from 'spectacle-code-slide';
// import { Song, Track, Instrument, Effect } from 'reactronica';

// import ReactLive from './ReactLive';
import StepsEditorSlide from './components/StepsEditorSlide';
import ComponentsSlide from './components/ComponentsSlide';
import TabExample from './components/TabExample';
// import codeTheme from './codeTheme';
// import WaveAnimation from './components/WaveAnimation/WaveAnimation';

import './global.module.css';
import './App.css';
import './codeTheme.scss';
import './codePane.scss';

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

const MainHeading = styled(RawHeading)`
  margin-bottom: 64px;
  font-size: 10rem;
  line-height: 1.2;
  background: linear-gradient(160deg, #5f0fd1, #0fa6d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Heading = styled(RawHeading)`
  margin-bottom: 64px;
  line-height: 1.2;
  background: linear-gradient(160deg, #5f0fd1, #0fa6d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SubHeading = styled(RawHeading)`
  color: #ccc;
  font-weight: 600;
`;

// const Quote = styled(RawQuote)`
//   color: var(--colour-primary);
//   margin-bottom: 2rem;
//   line-height: 1.3;
// `;

const Text = styled(RawText)`
  color: #ccc;
  font-size: ${props => (props.fontSize ? props.fontSize : '2.666rem')};
`;

const List = styled(RawList)`
  list-style-position: outside;
`;

const ListItem = styled(RawListItem)`
  margin-bottom: 1em;
  line-height: 1.4;
`;

const WideSlide = styled(Slide)`
  max-width: 1800px;
  max-height: 900px;
  height: ${props => (props.height ? props.height : 'auto')};
`;

function App() {
  return (
    <div className="App">
      <Deck theme={theme} showFullscreenControl={false} progress="bar">
        <Slide>
          <Text>
            <strong>Music</strong> as a Function of <strong>State</strong>
          </Text>
          <MainHeading>Reactronica</MainHeading>
          {/* <WaveAnimation></WaveAnimation> */}
          <br />
          <br />
          <SubHeading size={5}>
            <a href="https://twitter.com/unkleho">@unkleho</a>
          </SubHeading>
          <br></br>
          <Text fontSize="2rem">DX Lab, State Library of NSW</Text>
        </Slide>

        <Slide>
          <Heading>About</Heading>
          <List>
            <Appear>
              <ListItem>
                <strong>DX Lab Technical Lead</strong> at the{' '}
                <strong>State Library of NSW</strong>
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>Design background</ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Released electronic/hip hop music as <strong>Unkle Ho</strong>{' '}
                and with <strong>The Herd</strong>
              </ListItem>
            </Appear>
          </List>
        </Slide>

        {/* <Slide>
          <Quote>“...UI as a pure function of application state”</Quote>
          <Text>
            @rauchg,{' '}
            <a href="https://rauchg.com/2015/pure-ui/">
              rauchg.com/2015/pure-ui
            </a>
          </Text>
        </Slide> */}

        <Slide>
          <Heading size={3}>UI as a Function of State</Heading>
          <List>
            {/* <ListItem>
              React popularised rendering predictable markup from functions
            </ListItem> */}
            <Appear>
              <ListItem>UI = f(state)</ListItem>
            </Appear>
            <Appear>
              <ListItem>
                HTML: <strong>React DOM</strong>
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Mobile App: <strong>React Native</strong>
              </ListItem>
            </Appear>

            <Appear>
              <ListItem>VR, 3D, Command Line, TV, PDF etc</ListItem>
            </Appear>

            <Appear>
              <ListItem>
                More at{' '}
                <a href="https://github.com/chentsulin/awesome-react-renderer">
                  github.com/chentsulin/awesome-react-renderer
                </a>
              </ListItem>
            </Appear>
          </List>

          <Notes>
            We are at a React conference, so we know this already...
          </Notes>
        </Slide>

        {/* <Slide>
          <Heading size={3}>_____ as a Function of State</Heading>
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

          <Notes>Ask audience for examples, show screen shots</Notes>
        </Slide> */}

        {/* <Slide>
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

          <Notes>
            Turns out, React and JSX is quite good at describing music. Rather
            than declaring visual elements in 2D or 3D, Reactronica declares
            music in 4D. I'd consider animation 4D and React already does this.
          </Notes>
        </Slide> */}

        <Slide>
          <SubHeading size={5}>Introducing</SubHeading>
          <Heading>Reactronica</Heading>
          <Text>Music = f(state)</Text>
        </Slide>

        <Slide>
          <Heading size={3}>Reactronica</Heading>
          <List>
            <Appear>
              <ListItem>React components for making music</ListItem>
            </Appear>
            <Appear>
              <ListItem>VERY early days...</ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Inspired by <strong>React Music</strong>
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Uses <strong>Tone JS</strong> under the hood
              </ListItem>
            </Appear>
          </List>
        </Slide>

        {/* <Slide>
          <Heading size={3}>Tone JS</Heading>
          <List>
            <ListItem>Powerful audio library for the web</ListItem>
            <ListItem>Mostly imperative</ListItem>
            <ListItem>Class based</ListItem>
            <ListItem>Large API - 140 classes!</ListItem>
          </List>
        </Slide> */}

        {/* <WideSlide>
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
      synth.current.triggerAttackRelease('C3', '4n');
    }}>Play</button>
  )
}`}
              scope={{
                Tone,
                useRef: React.useRef,
                useState: React.useState,
                useEffect: React.useEffect,
              }}
              theme={codeTheme}
              language="jsx"
            >
              <LiveEditor className="code-theme react-live__editor" />
              <div className="react-live__preview-pane">
                <LiveError className="react-live__error" />
                <LivePreview className="react-live__preview" />
              </div>
            </LiveProvider>
          </div>
        </WideSlide> */}

        {/* <Slide>
          <Heading size={3}>Reactronica API</Heading>
          <List>
            <ListItem>Modelled on how modern DAWs work</ListItem>
            <ListItem>Show Ableton Image</ListItem>
          </List>
        </Slide> */}

        {/* <Slide>
          <Heading size={3}>Components</Heading>
          <List>
            <ListItem>
              <code>{`<Song />`}</code> Top level wrapper
            </ListItem>
            <ListItem>
              <code>{`<Track />`}</code> Layer of audio
            </ListItem>
            <ListItem>
              <code>{`<Instrument />`}</code> Audio source of Track
            </ListItem>
            <ListItem>
              <code>{`<Effect />`}</code> Audio effects such as reverb and delay
            </ListItem>
          </List>
        </Slide> */}

        {/**
         * Demo Reactronica API Components
         */}

        <WideSlide>
          <ComponentsSlide></ComponentsSlide>
        </WideSlide>

        <WideSlide height="100%">
          <StepsEditorSlide
            defaultSteps={[null]}
            startNote="C3"
            endNote="B3"
          ></StepsEditorSlide>
        </WideSlide>

        {/**
         * Show internals of Reactronica components
         */}

        <Slide>
          <Heading>Internals</Heading>
          <Text>Song and Instrument components</Text>
        </Slide>

        <CodeSlide
          code={`const SongContext = React.createContext();
          
const Song = ({
  isPlaying,
  bpm,
  children
}) => {
  useEffect(() => {
    if (isPlaying) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
  }, [isPlaying]);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm])

  return (
    <SongContext.Provider value={{ isPlaying }}>
      {children}
    </SongContext.Provider>
  )
}`}
          ranges={[
            {
              loc: [2, 7],
              // title: 'Song props',
            },
            {
              loc: [3, 4],
              // title: isPlaying prop
            },
            {
              loc: [7, 14],
              // title: isPlaying useEffect
            },
            {
              loc: [4, 5],
              // title: bpm prop
            },
            {
              loc: [15, 18],
              // title: isPlaying useEffect
            },
            {
              loc: [0, 1],
              // title: 'SongContext createContext',
            },
            {
              loc: [20, 23],
              // title: 'SongContext.Provider',
            },
          ]}
          className="code-theme code-slide"
          lang="jsx"
        >
          <Notes>
            Show Reactronica Song internals. Mention that this is a simplified
            version!
          </Notes>
        </CodeSlide>

        <CodeSlide
          code={`const Track = ({
  steps,
  onStepPlay,
  children,
}) => {
  const { isPlaying } = useContext(SongContext);
  const sequencer = useRef();
  const instrument = useRef();

  useEffect(() => {
    sequencer.current = new Tone.Sequence(
      (_, note) => {
        instrument.current.triggerAttackRelease(note)

        if (typeof onStepPlay === 'function') {
          onStepPlay(note);
        }
      },
      steps,
    )

    return () => {
      sequencer.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      sequencer.current.start();
    } else {
      sequencer.current.stop();
    }
  }, [isPlaying])

  useEffect(() => {
    sequencer.current.removeAll();

    steps.forEach((note, i) => {
      sequencer.current.add(i, note);
    });
  }, [steps])

  return (
    <TrackContext.Provider>
      {children}
    </TrackContext.Provider>
  );
}`}
          ranges={[
            {
              loc: [0, 5],
              // title: 'Track props',
            },
            {
              loc: [6, 7],
            },
            {
              loc: [9, 20],
              // title: 'Mount effect' to set up sequence
            },
            {
              loc: [21, 24],
              // title: 'Unmount' cleanup function
            },
            {
              loc: [24, 25],
              // title: Empty array dep ensures it only runs once
            },
            {
              loc: [5, 6],
              // title: Access isPlaying from Song using context
            },
            {
              loc: [26, 33],
              // title: start or stop sequencer if isPlaying changes
            },
            {
              loc: [34, 41],
              // title: update Tone.Sequence if steps change
            },
          ]}
          className="code-theme code-slide"
          lang="jsx"
        >
          <Notes>
            Show Reactronica Track internals. Highly simplified version, without
            Instrument update and effects
          </Notes>
        </CodeSlide>

        {/* --------------------------------------------------------------- */}
        {/* DEMOS */}
        {/* --------------------------------------------------------------- */}

        <Slide>
          <Heading>Demos</Heading>
        </Slide>

        <Slide>
          <Heading size={3}>Ukulele Tab</Heading>
          <TabExample></TabExample>
        </Slide>

        <Slide>
          <Heading>DAW</Heading>

          <Notes>Show instruments and effects</Notes>
        </Slide>

        <Slide>
          <Heading>MIDI Drum Pads</Heading>

          <Notes>Little performance!</Notes>
        </Slide>
      </Deck>
    </div>
  );
}

export default App;
