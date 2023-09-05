const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8080/',
    secure: false,
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;

// Não esquecer de mudar no package.json o ng serve
// para ng serve --proxy-config proxy.conf.js e iniciar com npm run start
