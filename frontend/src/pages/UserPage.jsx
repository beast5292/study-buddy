import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserPage.css';

const UserPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append(
            "myFile",
            selectedFile,
        );
        console.log(selectedFile);
        //Add the fetch method to pass the data to the backend api
        const res = await fetch("http://127.0.0.1:8000/upload", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            console.log("file uploaded successfully")

            fetch("http://127.0.0.1:8000/download")
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "summary.docx"); // filename
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                });
        }
    };
    /* const fileData = () => {
        if (selectedFile) {
            return (
                <div className='file-info'>
                    <h4>File Information:</h4>
                    <p>File Name: {selectedFile.name}</p>
                    <p>File Type: {selectedFile.type}</p>
                    <p>
                        Last Modified:
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        }
    }; */

    return (
        <div className='user-page-container'>
            <h1>StudyBuddy</h1>
            <h3>AI word document summarizer</h3>
            <div>
                <input className='file-input' type="file" onChange={onFileChange} />
                <br />
                <button onClick={onFileUpload}>Upload</button>
            </div>
            {/* {fileData()} */}
        </div>
    );
};

export default UserPage;
