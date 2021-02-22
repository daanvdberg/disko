import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import GridView from '../../components/GridView';
import WishlistService from '../../service/wishlist';
import Store, { IStore } from '../../store';
import { Wishlist as IWishlist, WishlistResponse } from '../../types';

const updateWishlist = (wishlist: IWishlist[]) => (s: IStore) => {
	s.wishlist = wishlist;
};

function Wishlist() {

	const wishlist = Store.useState((s) => s.wishlist);

	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [perPage] = useState<50 | 75 | 100>(50);
	const [pageCount, setPageCount] = useState<number>(1);

	useEffect(() => {
		WishlistService.get(page, perPage).then((res: WishlistResponse) => {
			console.log(res);
			setPageCount(Math.ceil(res.pagination.items / perPage));
			Store.update(updateWishlist(res.wants));
		}).finally(() => setLoading(false));
	}, [page]);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<Box>

			<GridView items={wishlist} loading={loading} />

			{pageCount > 1 &&
				<Box pt={8} display='flex' justifyContent='center'>
					<Pagination
						shape='rounded'
						count={pageCount}
						page={page}
						boundaryCount={2}
						onChange={handlePageChange}
					/>
				</Box>
			}

		</Box>
	);
}

export default Wishlist;