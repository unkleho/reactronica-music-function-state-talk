# Reactronica: Music as a Function of State Talk

Slides from talk for ReactConfAU 2020, 27 Feb, Sydney.

> This is a pretty messy code base as it is for a one-off talk, but feel free to poke around.

# Getting Started

```bash
$ npm install
$ npm start
```

# Known Issues

- Ukulele tablature will NOT work as I've git ignored the source files due to copyright concerns.
- Latest Tone (13.8) has this issue `Cannot assign to read only property 'listener' of object '#<AudioContext>'` due to `https://stackoverflow.com/questions/55039122/why-does-tone-js-not-play-nice-in-a-svelte-component`. Downgrade to Tone 13.4.9
- If you get `Hooks can only be called inside the body of a function component.`, have a look at https://github.com/facebook/react/issues/14721. Try using the same instance of react from reactronica `npm link ../reactronica/node_modules/react`.
