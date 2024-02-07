import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const DelayedSignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
        // remove user from storage
    localStorage.removeItem('user')
      navigate('/');
    }, 6000); // 6 seconds delay

    return () => clearTimeout(timeout); // Clear timeout on unmount
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h1>User creation successful and Redirecting to Login...</h1>
      </div>
    </div>
  );
};

export default DelayedSignUp;
