const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.post('/createFile', (req, res) => {
    const folderPath = 'D:\task';
    const timestamp = new Date().toISOString();
    const fileName = `${timestamp}.txt`;
    const filePath = path.join(folderPath, fileName);
    const fileContent = timestamp;

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while creating the file.');
        }
        res.send('File created successfully!');
    });
});
app.get('/getFiles', (req, res) => {
    const folderPath = 'D:\task';

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while retrieving the files.');
        }
        const textFiles = files.filter((file) => path.extname(file) === '.txt');
        res.json(textFiles);
    });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});