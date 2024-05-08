// import React, { useState } from 'react';
// import axios from 'axios';
// import CryptoJS from 'crypto-js';

// const ImageUploader = () => {
//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const encryptAndUploadImage = async () => {
//         if (!selectedFile) {
//             alert('Please select a file.');
//             return;
//         }

//         const reader = new FileReader();
//         reader.readAsDataURL(selectedFile);

//         reader.onload = async () => {
//             const imageData = reader.result.split(',')[1]; // Remove "data:image/jpeg;base64," prefix
//             const encryptionKey = 'your-secret-key'; // Change this to your actual encryption key

//             const encryptedData = CryptoJS.AES.encrypt(imageData, encryptionKey);
//             const encryptedImageData = encryptedData.toString();

//             try {
//                 // Send encrypted image data to backend
//                 await axios.post('/upload', { encryptedImageData });
//                 alert('Image uploaded successfully!');
//             } catch (error) {
//                 console.error('Error uploading image:', error);
//                 alert('Error uploading image. Please try again.');
//             }
//         };

//         reader.onerror = () => {
//             console.error('Error reading the file');
//         };
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={encryptAndUploadImage}>Upload and Encrypt Image</button>
//         </div>
//     );
// };

// export default ImageUploader;

import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const ImageUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadImage = async () => {
        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            // Upload image to backend
            await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadImage}>Upload Image</button>
        </div>
    );
};

export default ImageUploader;
