import { Store as PSStore } from 'pullstate';
import { Wishlist } from './types/response/wishlist';

interface IStore {
	wishlist: Wishlist[];
}

const Store = new PSStore<IStore>({
	wishlist: []
});

export default Store;
export type {
	IStore
}