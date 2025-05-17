// components/SignUpForm.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://127.0.0.1:8000/addUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        if (res.ok) {
            // Sign in the user immediately after signup
            const loginRes = await fetch('http://127.0.0.1:8000/findUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const loginData = await loginRes.json();
            if (loginRes.ok) {
                navigate('/user');
            } else {
                alert(loginData.message);
            }
        } else {
            const data = await res.json();
            alert(data.message);
        }
    };

    return (
        <>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
                <p>
                    Already have an account?{' '}
                    <Link to="/auth/signin">Sign In</Link>
                </p>
            </form>
        </>
    );
};

export default SignUpForm;
