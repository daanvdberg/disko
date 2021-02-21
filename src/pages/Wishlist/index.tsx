import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, Theme, useMediaQuery } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { createStyles, makeStyles } from '@material-ui/styles';
import Release from '../../components/Release';
import WishlistService from '../../service/wishlist';
import Store, { IStore } from '../../store';
import { Wishlist as IWishlist, WishlistResponse } from '../../types';

const useStyles = makeStyles(({ spacing }: Theme) =>
	createStyles({
		loading: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: spacing(10, 0),
		},
		item: {
			display: 'flex',
			justifyContent: 'center',
			'& > div': {
				flexGrow: 1
			}
		}
	})
);

const updateWishlist = (wishlist: IWishlist[]) => (s: IStore) => {
	s.wishlist = wishlist;
};

function Wishlist() {

	const c = useStyles();
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

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

	if (loading) {
		return (
			<div className={c.loading}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<Grid container spacing={matches ? 2 : 4} justify='center'>

			{wishlist.map((item) => {
				const { basic_information, id } = item;
				return (
					<Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={c.item} key={id}>
						<Release {...basic_information} type='release' />
					</Grid>
				);
			})}

			{pageCount > 1 &&
				<Pagination
					shape='rounded'
					count={pageCount}
					page={page}
					boundaryCount={2}
					onChange={handlePageChange}
				/>
			}

		</Grid>
	);
}

export default Wishlist;