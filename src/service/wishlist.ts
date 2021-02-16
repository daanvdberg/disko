import api from './api';

const get = () => {
	return api({
		url:    `users/${process.env.REACT_APP_DISCOGS_USERNAME}/wants`,
		method: 'GET'
	});
}

const WishlistService = {
	get
}

export default WishlistService;