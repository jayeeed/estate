import axios from 'axios';

// Set base URL for Axios
axios.defaults.baseURL =  import.meta.env.VITE_API_BASE_URL;
console.log( import.meta.env.VITE_API_BASE_URL)
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

// Handle API request and response
const handleRequest = async (requestFunction) => {
  try {
    const response = await requestFunction();
    return response; 
  } catch (error) {
    throw error;
  }
};

// GET request
export const getApi = async (url) => {
  return handleRequest(() => axios.get(url));
};

// get data use id
export const getApiById = async (url, id) => {
  const urlWithUserId = `${url}?id=${id}`;

  return handleRequest(() => axios.get(urlWithUserId));
};

// POST request
export const postApi = async (url, data) => {
  return handleRequest(() => axios.post(url, data));
};

// PUT request
export const putApi = async (url, data) => {
  return handleRequest(() => axios.put(url, data));
};

// DELETE request
export const deleteApi = async (url, id) => {
  const urlWithUserId = `${url}?id=${id}`;

  return handleRequest(() => axios.delete(urlWithUserId));
};
