import api from './api';

const get = (id: number | string) => {
	return api({
		url:    `releases/${id}`,
		method: 'GET'
	});
}

const ReleaseService = {
	get
}

export default ReleaseService;