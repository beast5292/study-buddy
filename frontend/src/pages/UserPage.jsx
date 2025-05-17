import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserPage.css';

const UserPage = () => {
    
    return (
        <div className="user-page-container">
            <div className="user-card">
                <h2 className="user-heading">Welcome, User!</h2>
            </div>
        </div>
    );
};

export default UserPage;
