const express = require('express');
const cors = require('cors');
const {spawn} = require('child_process');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/:hash', (req, res) => {
    var dataToSend;

    const {hash} = req.params;

    const python = spawn('python', ['test.py', hash]);

    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });

    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.json(dataToSend)
    });
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}`));
