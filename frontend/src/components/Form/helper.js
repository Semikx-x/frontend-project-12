import axios from 'axios'

export const initialValues = {
  userName: "",
  password: ""
}

export const loginToken = async (values) => {
  
  try {
    const response = await axios.post('/api/v1/login', { username: values.userName, password: values.password })
    
    const token = JSON.stringify(response.data.token)
    localStorage.setItem('JWT', token);
    console.log(response.status)
    
    return response
  } catch (error) {
    if (error.response)
      throw new  Error('Неверные ник или пароль')
  }
}