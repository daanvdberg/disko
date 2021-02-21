import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Theme, useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import Release from '../../components/Release';
import Toolbar from '../../components/Toolbar';
import CollectionService, { PerPage } from '../../service/collection';
import Store, { IStore } from '../../store';
import { Collection as ICollection } from '../../types';

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

const updateCollection = (collection: ICollection[]) => (s: IStore) => {
	s.collection = collection;
};

function Collection() {

	const c = useStyles();
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const folderID = Store.useState((s) => s.activeFolder);
	const collection = Store.useState((s) => s.collection);

	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [perPage] = useState<PerPage>(50);
	const [pageCount, setPageCount] = useState(1);

	useEffect(() => {
		setLoading(true);
		CollectionService.getReleases(folderID, page, perPage).then((res) => {
			setPageCount(Math.ceil(res.pagination.items / perPage));
			Store.update(updateCollection(res.releases));
		}).finally(() => setLoading(false));
	}, [page, folderID]);

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
		<Box>

			<Toolbar />

			<Grid container spacing={matches ? 2 : 4} justify='center'>
				{collection.map((item) => {
					const { basic_information, id } = item;
					return (
						<Grid item xs={6} sm={4} md={3} lg={2} xl={2} className={c.item} key={id}>
							<Release {...basic_information} type='release' />
						</Grid>
					);
				})}
			</Grid>

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

export default Collection;