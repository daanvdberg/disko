import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Create a new Axios instance with a custom config
 */
const client = axios.create({
	baseURL: process.env.REACT_APP_DISCOGS_BASE_URL,
	headers: {
		'Accept': 'application/json',
		'Authorization': `Discogs token=${process.env.REACT_APP_DISCOGS_API_KEY}`
	}
});



/**
 * Request Wrapper with default success/error actions
 */
const api = (options: AxiosRequestConfig) => {
	const onSuccess = (response: AxiosResponse) => response.data;

	const onError = (error: AxiosError) => {
		console.error('Request Failed:', error.config);

		if (error.response) {
			// Request was made but server responded with something
			// other than 2xx
			console.error('Status:',  error.response.status);
			console.error('Data:',    error.response.data);
			console.error('Headers:', error.response.headers);

		} else {
			// Something else happened while setting up the request
			// triggered the error
			console.error('Error Message:', error.message);
		}

		return Promise.reject(error.response || error.message);
	}

	return client(options)
		.then(onSuccess)
		.catch(onError);
}

export default api;