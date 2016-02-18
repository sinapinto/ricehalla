export default {
  app: {
    title: 'ricewars',
    description: 'desktop customization contests',
    head: {
      titleTemplate: 'rice wars: %s',
      meta: [
        { name: 'description', content: 'desktop customization contests' },
        { name: 'viewport', content: 'width=device-width, initial-scale=2' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'ricewars' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'ricewars' },
        { property: 'og:description', content: 'desktop customization contests' },
        { property: 'og:card', content: 'summary' },
      ]
    },
  },
  jwt: {
    expires: '1h',
    secret: '8XZ03T11vP896m73u2z9i301150xP826d69I836174t200785735Vo',
  },
};
