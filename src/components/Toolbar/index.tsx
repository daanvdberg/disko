import React, { useEffect } from 'react';
import { Box, Grid, Menu, MenuItem, Paper, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import FolderIcon from '@material-ui/icons/Folder';
import CollectionService from '../../service/collection';
import Store, { IStore } from '../../store';
import { CollectionFolder } from '../../types';

const useStyles = makeStyles(({ spacing }: Theme) =>
	createStyles({
		button: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			padding: spacing(3, 4),
			cursor: 'pointer'
		}
	})
);

const updateActiveFolder = (id: number) => (s: IStore) => {
	s.activeFolder = id;
};

const updateFolders = (folders: CollectionFolder[]) => (s: IStore) => {
	s.folders = folders;
};

function Toolbar() {

	const c = useStyles();

	const activeFolder = Store.useState((s) => s.activeFolder);
	const folders = Store.useState((s) => s.folders);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	useEffect(() => {
		if (!folders || !folders.length) {
			CollectionService.getFolders().then((res) => {
				Store.update(updateFolders(res.folders));
			});
		}

	}, []);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

	const handleClose = () => setAnchorEl(null);

	const selectFolder = (event: React.MouseEvent<HTMLElement>, id: number) => {
		console.log(111, id);
		Store.update(updateActiveFolder(id));
		handleClose();
	};

	console.log(222, activeFolder);

	return (
		<Box pb={4}>
			<Grid container>
				<Grid item>
					<Paper className={c.button} onClick={handleOpen}>
						<FolderIcon />
						{folders[activeFolder] ? folders[activeFolder].name : 'All'}
					</Paper>
					<Menu
						id='folder'
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						{folders.map((folder) => (
							<MenuItem
								key={folder.id}
								selected={folder.id === activeFolder}
								onClick={(event) => selectFolder(event, folder.id)}
							>
								{folder.name}
							</MenuItem>
						))}
					</Menu>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Toolbar;