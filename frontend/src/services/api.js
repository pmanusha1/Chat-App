import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5003',
})

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getAllUsers = async () => {
    const response = await API.get('/users');
    return response.data;
};
  
export const searchUsers = async (q) => {
    const response = await API.get(`/users/search?q=${q}`);
    return response.data;
};
export const getMessages = async (user1Id, user2Id) => {
    const res = await API.get(`/messages?user1=${user1Id}&user2=${user2Id}`);
    return res.data;
};
  

export default API;