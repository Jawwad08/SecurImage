// import { useState } from 'react'
// import { useAuthContext } from './useAuthContext'

// export const useLogin = () => {
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(null)
//   const { dispatch } = useAuthContext()

//   const login = async (email, password) => {
//     setIsLoading(true)
//     setError(null)

//     const response = await fetch('http://localhost:5000/api/user/login', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({ email, password })
//     })
//     const json = await responase.json()

//     if (!response.ok) {
//       setIsLoading(false)
//       setError(json.error)
//     }
//     if (response.ok) {
//       // save the user to local storage
//       localStorage.setItem('user', JSON.stringify(json))

//       // update the auth context
//       dispatch({type: 'LOGIN', payload: json})

//       // update loading state
//       setIsLoading(false)
//     }
//   }

//   return { login, isLoading, error }
// }

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate(); // Import and use useNavigate hook

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error)
      }

      // Parse response JSON
      const json = await response.json();
      
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)

      // Navigate only when login is successful
      navigate('/loginImageGallery1', { state: { email, password } });
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  return { login, isLoading, error, setError }
}
