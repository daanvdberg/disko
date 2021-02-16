import { Box, Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import Release from '../../components/Release';
import WishlistService from '../../service/wishlist';
import Store, { IStore } from '../../store';
import { Wishlist as IWishlist, WishlistResponse } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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

	const wishlist = Store.useState((s) => s.wishlist);

	useEffect(() => {
		WishlistService.get().then((res: WishlistResponse) => {
			console.log(res);
			Store.update(updateWishlist(res.wants));
		});
	}, []);

	return (
		<div>
			Wishlist

			<Box mt={4}>
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
			</Box>
		</div>
	);
}

export default Wishlist;