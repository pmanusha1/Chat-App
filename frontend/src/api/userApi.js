import axios from 'axios';

export const getUsersExceptMe = async (token) => {
  const res = await axios.get('http://localhost:8080/users', {
    headers: {
      'x-token': token,
    },
  });
  return res.data;
};