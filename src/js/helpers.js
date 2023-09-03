import { API_URL, API_KEY, TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds.`));
    }, s * 1000);
  });
};

export const fetchFromApi = async function (endpoint, id = '', resorce = '') {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    const fetchPromise = await fetch(
      `${API_URL}${endpoint}${id ? '/' + id : ''}${
        resorce ? '/' + resorce : ''
      }?api_key=${API_KEY}`
    );
    const response = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
};
