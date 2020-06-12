const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('method1', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('method2', req.method);
    next();
})