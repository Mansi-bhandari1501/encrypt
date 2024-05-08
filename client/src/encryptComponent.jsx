import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const ImageEncryptionDecryptionComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [encryptedImageData, setEncryptedImageData] = useState(null);
    const [decryptedImageData, setDecryptedImageData] = useState(null);

    // Function to handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Function to encrypt image
    const encryptImage = () => {
        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = () => {
            const imageData = reader.result.split(',')[1]; // Remove "data:image/jpeg;base64," prefix
            const encryptionKey = 'zenmonk-funiberg'; // Change this to your actual encryption key

            const encryptedData = CryptoJS.AES.encrypt(imageData, encryptionKey);
            setEncryptedImageData(encryptedData.toString());
            console.log('encryptedData: ', encryptedData);
            setDecryptedImageData(null); // Clear decrypted image data
        };

        reader.onerror = () => {
            console.error('Error reading the file');
        };
    };

    // Function to decrypt image
    const decryptImage = () => {
        if (!encryptedImageData) {
            alert('No encrypted image data.');
            return;
        }

        const decryptionKey = 'zenmonk-funiberg'; // Change this to your actual decryption key
        const decryptedData = CryptoJS.AES.decrypt(encryptedImageData, decryptionKey);
        const decryptedImage = decryptedData.toString(CryptoJS.enc.Utf8);
        setDecryptedImageData(decryptedImage);
        // console.log('decryptedImage: ', decryptedImage);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={encryptImage}>Encrypt Image</button>
            <button onClick={decryptImage}>Decrypt Image</button>
            {!decryptedImageData && encryptedImageData && <img src={`data:image/jpeg;base64,${encryptedImageData}`} alt="Encrypted Image" />}
            {decryptedImageData && <img src={`data:image/jpeg;base64,${decryptedImageData}`} alt="Decrypted Image" />}
        </div>
    );
};

export default ImageEncryptionDecryptionComponent;
