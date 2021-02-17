import React, { Fragment, useEffect, useState } from 'react';
import { CircularProgress, Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import Header from '../../components/Header';
import Release from '../../components/Release';
import WishlistService from '../../service/wishlist';
import Store, { IStore } from '../../store';
import { Wishlist as IWishlist, WishlistResponse } from '../../types';

const useStyles = makeStyles(({ palette }: Theme) =>
	createStyles({
		loading: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: palette.secondary.main
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
}

function Wishlist() {

	const c = useStyles();

	const [loading, setLoading] = useState(true);
	const wishlist = Store.useState((s) => s.wishlist);

	useEffect(() => {
		WishlistService.get().then((res: WishlistResponse) => {
			console.log(res);
			Store.update(updateWishlist(res.wants));
		}).finally(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<div className={c.loading}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<Grid container spacing={4} justify='center'>
			{wishlist.map((item) => {
				const { basic_information, id } = item;
				return (
					<Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={c.item} key={id}>
						<Release {...basic_information} type='release' />
					</Grid>
				);
			})}
		</Grid>
	);
}

export default Wishlist;