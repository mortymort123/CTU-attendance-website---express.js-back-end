import express from 'express';
import apiRoutes from './api.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connection from './database.js'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 5000;

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database");
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api', apiRoutes);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/UserData', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/Registration', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/ReadTagID', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/AllAttendanceLog', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/ScanTagID', function (req, res) {
    io.emit("scan-user", req.body.UIDresult);
    res.status(200).send("success");
});


server.listen(PORT, () => { console.log(`listening on port http://localhost:${PORT}`) });
