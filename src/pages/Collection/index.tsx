import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import GridView from '../../components/GridView';
import Toolbar from '../../components/Toolbar';
import CollectionService, { PerPage } from '../../service/collection';
import Store, { IStore } from '../../store';
import { Collection as ICollection } from '../../types';

const updateCollection = (collection: ICollection[]) => (s: IStore) => {
	s.collection = collection;
};

function Collection() {

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
		}).finally(() => setTimeout(() => setLoading(false), 10000));
	}, [page, folderID]);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<Box>

			<Toolbar />

			<GridView items={collection} loading={loading} />

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