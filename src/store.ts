import { Store as PSStore } from 'pullstate';
import { Collection, CollectionFolder, Wishlist } from './types';

interface IStore {
	wishlist: Wishlist[];
	folders: CollectionFolder[];
	activeFolder: number;
	collection: Collection[];
}

const Store = new PSStore<IStore>({
	wishlist: [],
	folders: [],
	activeFolder: 0,
	collection: []
});

export default Store;
export type {
	IStore
}