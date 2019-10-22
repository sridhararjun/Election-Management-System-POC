const document = {
  production: {
    server: {
      host: 'localhost',
      port: 3000,
      routes: {
        cors: {
          origin: ['*']
        },
      }
    },
    jwt_secret: {
      key: 'q8ptWqta7Y648ywrwZhqWc81KcX5nhS8'
    }
  },
  development: {
    server: {
      host: 'localhost',
      port: 3001,
      routes: {
        cors: {
          origin: ['*']
        },
      }
    },
    jwt_secret: {
      key: 'q8ptWqta7Y648ywrwZhqWc81KcX5nhS8'
    }
  }
};

const env = process.env.MODE;
let loadDocument = null;

switch (env) {
  case 'production':
    loadDocument = document.production;
    break;
  case 'development':
    loadDocument = document.development;
    break;
  default:
    loadDocument = document.development;
    break;
}

module.exports = loadDocument;
