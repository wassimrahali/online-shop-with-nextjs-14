import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = 'http://localhost:1337/api'; // Adjust if needed

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json', // Include this if your API expects JSON content
  },
});

export default axiosClient;
