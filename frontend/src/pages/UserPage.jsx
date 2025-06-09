import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserPage.css';

const UserPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "myFile",
             selectedFile,
             selectedFile.name
        );
        console.log(selectedFile);
        //Add the fetch method to pass the data to the backend api
    };
    const fileData = () => {
        if (selectedFile) {
            return (
                <div>
                    <h2>File Information:</h2>
                    <p>File Name: {selectedFile.name}</p>
                    <p>File Type: {selectedFile.type}</p>
                    <p>
                        Last Modified:
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose the file</h4>
                </div>
            );
        }
    };
    
    return (
        <div className='user-page-container'>
            <h1>StudyBuddy</h1>
            <h3>AI word document summarizer</h3>
            <div>
                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>Upload</button>
            </div>
            {fileData()}
        </div>
    );
};

export default UserPage;
