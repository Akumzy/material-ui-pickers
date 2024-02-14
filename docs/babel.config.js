module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: {
          '@akumzy/material-ui-pickers/CalendarSkeleton': '@akumzy/material-ui-pickers/src/CalendarSkeleton',
        },
      },
    ],
  ],
};
