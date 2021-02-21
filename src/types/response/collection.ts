import { Release } from './release';

export interface CollectionFolder {
	id: number;
	count: number;
	name: string;
	resource_url: string;
}

export interface Collection {
	date_added: Date;
	id: number;
	folder_id: number;
	instance_id: number;
	rating: number;
	basic_information: Release;
	notes: { field_id: number, value: string }[]
}
