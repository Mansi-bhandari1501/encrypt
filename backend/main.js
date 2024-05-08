// const express = require('express');
// const multer = require('multer');
// const CryptoJS = require('crypto-js');

// const app = express();

// // Multer storage configuration
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Endpoint to receive uploaded image and encrypt it
// app.post('/upload', upload.single('image'), (req, res) => {
//     const imageData = req.file.buffer.toString('base64');
//     const encryptionKey = 'your-secret-key'; // Change this to your actual encryption key

//     const encryptedData = CryptoJS.AES.encrypt(imageData, encryptionKey);
//     const encryptedImageData = encryptedData.toString();

//     // Store encryptedImageData in your database or filesystem

//     res.sendStatus(200);
// });

// // Endpoint to send encrypted image data to frontend
// app.get('/image', (req, res) => {
//     // Retrieve encryptedImageData from your storage (database or filesystem)
//     const encryptedImageData = '...'; // Retrieve from storage

//     res.json({ encryptedImageData });
// });

// app.listen(3001, () => {
//     console.log('Server is running on port 3001');
// });

// const express = require('express');
// const multer = require('multer');
// const CryptoJS = require('crypto-js');
// const mongoose = require('mongoose');

// const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/image_db', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));

// // Define a schema for storing encrypted image data
// const imageSchema = new mongoose.Schema({
//     encryptedImageData: String
// });

// const ImageModel = mongoose.model('Image', imageSchema);

// // Multer storage configuration
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Endpoint to receive uploaded image, encrypt it, and store in MongoDB
// app.post('/upload', upload.single('image'), async (req, res) => {
//     const imageData = req.file.buffer.toString('base64');
//     const encryptionKey = 'your-secret-key'; // Change this to your actual encryption key

//     const encryptedData = CryptoJS.AES.encrypt(imageData, encryptionKey);
//     const encryptedImageData = encryptedData.toString();

//     try {
//         // Store encryptedImageData in MongoDB
//         await ImageModel.create({ encryptedImageData });
//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error storing image:', error);
//         res.status(500).send('Error storing image. Please try again.');
//     }
// });

// // Endpoint to send encrypted image data to frontend
// app.get('/image', async (req, res) => {
//     try {
//         // Retrieve encryptedImageData from MongoDB
//         const { encryptedImageData } = await ImageModel.findOne();
//         res.json({ encryptedImageData });
//     } catch (error) {
//         console.error('Error fetching image:', error);
//         res.status(500).send('Error fetching image. Please try again.');
//     }
// });

// app.listen(3001, () => {
//     console.log('Server is running on port 3001');
// });


const express = require('express');
const multer = require('multer');
const CryptoJS = require('crypto-js');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/encrypted_images', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema for storing encrypted image data
const encryptedImageSchema = new mongoose.Schema({
    encryptedImageData: String
});

const EncryptedImage = mongoose.model('EncryptedImage', encryptedImageSchema);

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to receive uploaded image, encrypt it, and store in MongoDB
app.post('/upload', upload.single('image'), async (req, res) => {
    const imageData = req.file.buffer.toString('base64');
    const encryptionKey = 'your-secret-key'; // Change this to your actual encryption key

    const encryptedData = CryptoJS.AES.encrypt(imageData, encryptionKey);
    const encryptedImageData = encryptedData.toString();

    try {
        // Store encryptedImageData in MongoDB
        await EncryptedImage.create({ encryptedImageData });
        res.sendStatus(200);
    } catch (error) {
        console.error('Error storing image:', error);
        res.status(500).send('Error storing image. Please try again.');
    }
});

// Endpoint to send decrypted image data to frontend
app.get('/image', async (req, res) => {
    try {
        // Retrieve encryptedImageData from MongoDB
        const { encryptedImageData } = await EncryptedImage.findOne();

        // Decrypt the image data
        const decryptionKey = 'your-secret-key'; // Change this to your actual decryption key
        const decryptedData = CryptoJS.AES.decrypt(encryptedImageData, decryptionKey);
        const imageData = decryptedData.toString(CryptoJS.enc.Utf8);

        res.send(imageData);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Error fetching image. Please try again.');
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
