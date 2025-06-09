import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import UserPage from './pages/UserPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />}>
          <Route index element={<Navigate to="signin" />} />
          <Route path="signin" element={<SignInForm />} />
          <Route path="signup" element={<SignUpForm />} />
        </Route>
        <Route path="/" element={<Navigate to="/auth/signin" />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;