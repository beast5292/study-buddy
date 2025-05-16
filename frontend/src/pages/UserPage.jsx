import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserPage.css';

const UserPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/auth/signin');

        fetch('http://localhost:5000/api/user/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data._id) setUser(data);
                else navigate('/auth/signin');
            });
    }, []);

    if (!user) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;

    return (
        <div className="user-page-container">
            <div className="user-card">
                <h2 className="user-heading">Welcome, {user.name}!</h2>
                <p className="user-text"><strong>Email:</strong> {user.email}</p>
                <p className="user-text"><strong>User ID:</strong> {user._id}</p>
            </div>
        </div>
    );
};

export default UserPage;
