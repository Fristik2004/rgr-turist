const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();
const port = 3000;
const rootFolderPath = path.join(__dirname, '/public/img');
app.use(express.static('public'));
app.use('/public', express.static(rootFolderPath));
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})
app.get('/img', (req, res) => {
    const imageFiles = getAllImageFiles(rootFolderPath);
    res.json(imageFiles);
});

function getAllImageFiles(folderPath) {
    let imageFiles = [];

    const files = fs.readdirSync(folderPath);

    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isDirectory()) {
            const subfolderImageFiles = getAllImageFiles(filePath);
            imageFiles = imageFiles.concat(subfolderImageFiles);
        } else {
            const extension = path.extname(file).toLowerCase();
            if (['.jpg', '.webp', '.png', '.gif'].includes(extension)) {
                imageFiles.push(path.relative(rootFolderPath, filePath));
            }
        }
    });

    return imageFiles;
}

app.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});
