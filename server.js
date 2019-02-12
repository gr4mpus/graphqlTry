const express = require('express');
const expressGraphQl = require('express-graphql');
const schema = require('./schema')

const app = express();

app.use('/graphql',expressGraphQl({
    schema: schema,
    graphiql: true
}))

app.listen(4444,()=>console.log('http://localhost:4444'))