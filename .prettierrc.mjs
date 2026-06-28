const config = {
  singleQuote: true, // override default double quotes to single quotes
  endOfLine: 'auto', // override default to keep existing line endings
  tabWidth: 2,
  bracketSameLine: false,
  semi: true,
  useTabs: false,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  printWidth: 80, // for html, css, scss files
  overrides: [
    {
      files: '*.ts',
      options: {
        printWidth: 120,
      },
    },
  ],
};

export default config;
