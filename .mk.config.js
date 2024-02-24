declare({
  name: 'link',
  as: shell({
    bin: 'npm',
    flags: [
      'link',
      'gs-testing',
      'gs-types',
      'devbase',
    ],
  }),
});
