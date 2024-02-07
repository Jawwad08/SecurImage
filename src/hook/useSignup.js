import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (name, email, password) => {
    // Validation: Check if any field is empty
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Something went wrong.");
      } else {
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
        // Navigate only when signup is successful
        navigate('/signImageGallery1', { state: { email, password } });
      }
    } catch (error) {
      setError(error.message || "An error occurred while signing up.");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
