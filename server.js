const express = require('express');
const path = require('path');

var app = express();


app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'test.html'));
});

app.portNumber = 4000;
app.listen(app.portNumber, function () {
    console.log('server running at: localhost:' + app.portNumber);
});