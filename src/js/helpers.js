import { API_URL, API_KEY } from './config';

export const fetchFromApi = async function (endpoint, id = '', resorce = '') {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    const response = await fetch(
      `${API_URL}${endpoint}${id ? '/' + id : ''}${
        resorce ? '/' + resorce : ''
      }?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error}`);
  }
};
