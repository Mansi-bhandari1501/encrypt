// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CryptoJS from 'crypto-js';

// const DecryptedImageViewer = () => {
//     const [decryptedImage, setDecryptedImage] = useState('');

//     useEffect(() => {
//         const fetchAndDecryptImage = async () => {
//             try {
//                 // Fetch encrypted image data from backend
//                 const response = await axios.get('/image');
//                 const encryptedImageData = response.data.encryptedImageData;

//                 const decryptionKey = 'your-secret-key'; // Change this to your actual decryption key
//                 const decryptedData = CryptoJS.AES.decrypt(encryptedImageData, decryptionKey);
//                 const imageData = decryptedData.toString(CryptoJS.enc.Utf8);

//                 setDecryptedImage(imageData);
//             } catch (error) {
//                 console.error('Error fetching or decrypting image:', error);
//             }
//         };

//         fetchAndDecryptImage();
//     }, []);

//     return (
//         <div>
//             {decryptedImage && <img src={`data:image/jpeg;base64,${decryptedImage}`} alt="Decrypted Image" />}
//         </div>
//     );
// };

// export default DecryptedImageViewer;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const DecryptedImageViewer = () => {
    const [decryptedImage, setDecryptedImage] = useState('');

    useEffect(() => {
        const fetchAndDecryptImage = async () => {
            try {
                // Fetch encrypted image data from backend
                const response = await axios.get('/image');
                const encryptedImageData = response.data.encryptedImageData;

                const decryptionKey = 'your-secret-key'; // Change this to your actual decryption key
                const decryptedData = CryptoJS.AES.decrypt(encryptedImageData, decryptionKey);
                const imageData = decryptedData.toString(CryptoJS.enc.Utf8);

                setDecryptedImage(imageData);
            } catch (error) {
                console.error('Error fetching or decrypting image:', error);
            }
        };

        fetchAndDecryptImage();
    }, []);

    return (
        <div>
            {decryptedImage && <img src={`data:image/jpeg;base64,${decryptedImage}`} alt="Decrypted Image" />}
        </div>
    );
};

export default DecryptedImageViewer;
