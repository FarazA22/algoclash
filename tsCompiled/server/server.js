"use strict";
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
io.on('connection', (socket) => {
    console.log('a user connected!');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
    app.use('/build', express.static(path.join(__dirname, '../build')));
    app.get('/', (req, res) => {
        return res.status(200).sendFile(path.join(__dirname, '../index.html'));
    });
}
;
app.use('/', (_, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../public/index.html'));
});
// global error handler --->
app.use((err, _, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
http.listen(PORT, () => console.log(`listening on: ${PORT}!`));
//# sourceMappingURL=server.js.map