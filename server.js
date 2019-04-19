const express = require('express');
const app = express();
const express_graphql = require('express-graphql');


const Configuration = require('./config/default');
const pkg = require('./package.json');
const port = Configuration.application.port;

let logServerMessage = msg => {
  console.log(`${pkg.name} v${pkg.version} :: ${msg}`);
};
global.logMessage = logServerMessage;

app.get('/ekg', (req, res) => {
    global.logMessage(`/ekg GET`);
    let payload = {
        name: pkg.name,
        version: pkg.version
    };
    res.status(200).send({body:payload});
});

let data = require('./src/data');
let schema = require('./src/schema');
let root = require('./src/root');

let graphqlConfig = {
    schema: schema,
    rootValue: root,
    graphiql: true
};

app.use('/graphql', express_graphql(graphqlConfig));

app.listen(port, () => global.logMessage((`Express GraphQL Server Now Running on port ${port}`)));