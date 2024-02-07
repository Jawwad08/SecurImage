import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useAdvlogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const alogin = async (email, password, category1, image1, category2, image2, category3, image3) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/user/alogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, category1, image1, category2, image2, category3, image3 })
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error || 'Failed to login');
      }

      const json = await response.json();
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      navigate('/home');

    
          navigate('/home');
          setIsLoading(false);

    } catch (error) {
      setError(error.message);
      navigate('/login');
    } 
  };

  return { alogin, isLoading, error,setError };
};
