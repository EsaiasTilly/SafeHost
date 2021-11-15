import express from 'express';
import fileUpload from 'express-fileupload';
const app = express();
app.use(fileUpload());
const port = 3000;

app.get('/', (req, res) => res.send("\
    <form method=\"post\" action=\"http://127.0.0.1:3000/upload\" encType=\"multipart/form-data\">\
        <input type=\"text\" name=\"api_key\" value=\"\" />\
        <input type=\"file\" name=\"upload\" />\
        <input type=\"submit\" name=\"submit\" />\
    </form>\
"));

app.post('/upload', (req, res) => {
    try
    {
        const uploads = [];
        if(req.files.upload.constructor == Array) req.files.upload.forEach(file => uploads.push(file));
        else uploads.push(req.files.upload);
        
        uploads.forEach(file => {
            file.mv(`./uploads/${file.name}`, (err) => {
                if(err) throw err;
            });
        });
    } catch (error) {
        res.json(
            {
                status: 'error',
                message: 'An error occurred!'
            }
        );
        console.error(error);
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));