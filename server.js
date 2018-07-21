/*const express = require('express');
const path = require('path');
const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/build/index.html'));
    });
}

const PORT = process.env.PORT || 3009;

app.listen(PORT, () => {
    console.log('port', PORT);
})*/

const express = require('express');
const path = require('path');
const app = express();

function cacheControl(req, res, next) {
    // instruct browser to revalidate in 60 seconds
    res.header('Cache-Control', 'max-age=86400000');
    res.header('Access-Control-Allow-Origin', '*');
    next();
}

app.use(cacheControl, express.static(path.join(__dirname, 'build')));
console.log(__dirname);
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3011);