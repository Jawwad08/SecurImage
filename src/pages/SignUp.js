import { useState } from "react";
import { useSignup } from "../hook/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Add error state and setError function
  const { signup, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!name.trim() || !email.trim() || !password.trim()) {
      // If any field is empty, set an error message and return early without submitting
      setError("Please fill in all fields.");
      return;
    }

    // Call the signup function if all fields are filled
    await signup(name, email, password);

    // Check if there is no error (signup was successful) before navigating
    if (!error) {
      navigate('/signImageGallery1', { state: { email, password } });
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        placeholder="Username" 
      />
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
        placeholder="Email" 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password}
        placeholder="Password"  
      />
      <button type="submit" disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;