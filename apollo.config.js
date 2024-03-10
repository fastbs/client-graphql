// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'client-graphql',
        // URL to the GraphQL API
        url: 'http://localhost:4400/graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }
  