import { useState, useEffect, useRef } from "react";
import { useLogin } from "../hook/useLogin";
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    document.body.style.textAlign = '';
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading, setError } = useLogin();

  const isLoadingRef = useRef(isLoading); // Initialize ref with initial isLoading value
  useEffect(() => {
    isLoadingRef.current = isLoading; // Update ref value when isLoading changes
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const validateInputs = () => {
    if (!email.trim() || !password.trim()) {
      // If email or password is empty, set error and return false
      setError("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!isLoadingRef.current) {
      if (!validateInputs()) {
        // If inputs are not valid, return early
        return;
      }

      await login(email, password);
      // Check if login was successful and then navigate
      if (!error) {
        document.querySelector('.login').classList.add('fade-out'); // Add fade-out class
        setTimeout(() => {
          navigate('/loginImageGallery1', { state: { email, password } });
        }, 1000);
      }
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading} onClick={handleLogin}>Log In</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
