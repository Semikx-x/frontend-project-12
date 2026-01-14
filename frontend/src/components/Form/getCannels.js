import axios from 'axios'



export const getChannels = async () => {
  
  try {
    const token = localStorage.getItem('JWT')
    const response = axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('poluchil')
    
  } catch (error) {
    if (error.response)
      throw new  Error('Проебал')
  }
}