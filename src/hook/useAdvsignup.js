import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const useAdvsignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const asignup = async (email,password,category1,image1,category2,image2,category3,image3) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:5000/api/user/asignup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email,password,category1,image1,category2,image2,category3,image3})
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('advuser', JSON.stringify(json))

      
      navigate('/DelaySignUp');
    }
  }

  return { asignup, isLoading, error }
}