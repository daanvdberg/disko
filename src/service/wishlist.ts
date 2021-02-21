import { WishlistResponse } from '../types';
import api from './api';

const get = (page = 1, perPage = 50): Promise<WishlistResponse> => {
	return api({
		url:    `users/${process.env.REACT_APP_DISCOGS_USERNAME}/wants?page=${page}&per_page=${perPage}`,
		method: 'GET'
	});
}

const WishlistService = {
	get
}

export default WishlistService;