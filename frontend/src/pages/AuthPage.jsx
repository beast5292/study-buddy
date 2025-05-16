import '../styles/AuthPage.css';
import icon from '../assets/icon.png';
import { Outlet } from 'react-router-dom';

const AuthPage = () => {
    return (
        <div className="auth-container">
            {/* Left: Image */}
            <div className="auth-image">
                <div className="app-name">
                    <img src={icon} alt="StudyBuddy Logo" className="app-logo" />
                </div>
            </div>

            {/* Right: Form */}
            <div className="auth-form">
                <div className="form-box">
                    <Outlet /> {/* 👈 This is where SignIn or SignUp will be injected */}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
