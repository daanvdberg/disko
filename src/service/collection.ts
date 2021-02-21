import { CollectionFolderResponse, CollectionResponse } from '../types';
import api from './api';

export type PerPage = 25 | 50 | 75 | 100;
export type Sort = 'label' | 'artist' | 'title' | 'catno' | 'format' | 'rating' | 'added' | 'year';
export type SortOrder = 'asc' | 'desc';

const getFolders = (): Promise<CollectionFolderResponse> => {
	return api({
		url:    `users/${process.env.REACT_APP_DISCOGS_USERNAME}/collection/folders`,
		method: 'GET'
	});
}

/**
 * Get releases by folder id
 * @param id            folder ID
 * @param page          current page
 * @param per_page      number of releases per page
 * @param sort          sort by key
 * @param sort_order    sort ascending or descending
 */
const getReleases = (id = 0, page = 1, per_page: PerPage = 50, sort: Sort = 'title', sort_order: SortOrder = 'desc'): Promise<CollectionResponse> => {
	const data = { page: page.toString(), per_page: per_page.toString(), sort, sort_order };
	const params = new URLSearchParams(data);
	return api({
		url:    `users/${process.env.REACT_APP_DISCOGS_USERNAME}/collection/folders/${id}/releases?${params.toString()}`,
		method: 'GET'
	});
}

const CollectionService = {
	getFolders,
	getReleases
}

export default CollectionService;