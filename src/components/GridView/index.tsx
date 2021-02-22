import React from 'react';
import { Grid, Theme, useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Collection, Wishlist } from '../../types';
import Release from '../Release';

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
				flexGrow: 1,
			}
		},
		skeleton: {
			padding: spacing(1.5, 1),
		},
		skeletonMedia: {
			marginBottom: spacing(1),
			paddingTop: '100%',
		}
	})
);

function GridView({ items, loading }: Props) {

	const c = useStyles();
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const LoadingRender = () => Array.from(new Array(25)).map((item, index) => (
		<Grid item xs={6} sm={4} md={3} lg={2} xl={2} className={c.item} key={index}>
			<Grid container direction='column' className={c.skeleton}>
				<Skeleton variant='rect' width='100%' className={c.skeletonMedia} />
				<Skeleton width='90%'/>
				<Skeleton width='60%' />
			</Grid>
		</Grid>
	));

	if (!items || (items && !items.length) || loading) {
		return (
			<Grid container spacing={matches ? 2 : 4} justify='center'>
				{LoadingRender()}
			</Grid>
		);
	}

	return (
		<Grid container spacing={matches ? 2 : 4}>
			{items.map((item) => {
				const { basic_information, id } = item;
				return (
					<Grid item xs={6} sm={4} md={3} lg={2} xl={2} className={c.item} key={id}>
						<Release {...basic_information} type='release' />
					</Grid>
				);
			})}
		</Grid>
	);
}

interface Props {
	items: (Collection | Wishlist)[];
	loading: boolean;
}

export default GridView;