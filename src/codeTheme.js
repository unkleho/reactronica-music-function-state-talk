import css from './global.module.css';

const theme = {
  plain: {
    backgroundColor: css['colour-black'],
    // color: css['colour-orange'],
    lineHeight: 1.3,
    fontFamily: 'Inconsolata, monospace',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: css['colour-grey-lighter'],
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: css['colour-grey-lightest'],
      },
    },
    {
      types: ['script'],
      style: {
        color: css['colour-orange'],
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['operator'],
      style: {
        color: css['colour-purple'],
      },
    },
    {
      types: ['number'],
      style: {
        color: css['colour-yellow'],
      },
    },
    {
      types: ['tag'],
      style: {
        color: css['colour-yellow'],
      },
    },
    {
      types: ['class-name'],
      style: {
        color: css['colour-yellow'],
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: css['colour-blue'],
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: '#eeebff',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: css['colour-yellow-dark'],
      },
    },
    {
      types: ['string'],
      style: {
        color: css['colour-green'],
      },
    },
    {
      types: [
        'boolean',
        'entity',
        'url',
        'attr-value',
        'keyword',
        'control',
        'directive',
        'unit',
        'statement',
        'regex',
        'at-rule',
        'placeholder',
        'variable',
      ],
      style: {
        color: css['colour-pink'],
      },
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#c4b9fe',
      },
    },
  ],
};

export default theme;
