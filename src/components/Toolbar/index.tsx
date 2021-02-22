import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Grid, Menu, MenuItem, Paper, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import FolderIcon from '@material-ui/icons/Folder';
import SortIcon from '@material-ui/icons/Sort';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewListIcon from '@material-ui/icons/ViewList';
import CollectionService from '../../service/collection';
import Store, { IStore } from '../../store';
import { CollectionFolder } from '../../types';

enum View { Grid = 'grid', List = 'list' }

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
	createStyles({
		toolbar: {
			paddingBottom: spacing(3),
			marginBottom: spacing(4),
			borderBottom: `1px solid ${palette.divider}`
		},
		button: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: spacing(2, 4),
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

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [view, setView] = useState<View>(View.Grid);

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
		Store.update(updateActiveFolder(id));
		handleClose();
	};

	const changeView = (view: View) => () => setView(view);

	return (
		<Box className={c.toolbar}>
			<Grid container justify='space-between' spacing={2}>
				<Grid item>
					<Paper className={c.button} onClick={handleOpen}>
						<FolderIcon />
						<Box ml={1}>{folders[activeFolder] ? folders[activeFolder].name : 'All'}</Box>
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
				<Grid item>
					<Paper className={c.button} onClick={handleOpen}>
						<FolderIcon />
						<Box ml={1}>{folders[activeFolder] ? folders[activeFolder].name : 'All'}</Box>
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
				<Grid item>
					<ButtonGroup size='small' aria-label='Sort releases'>
						<Button size='large'>
							<SortIcon style={{ 'transform': 'scaleY(-1)' }} />
						</Button>
						<Button size='large'>
							<SortIcon />
						</Button>
					</ButtonGroup>
				</Grid>
				<Grid item>
					<ButtonGroup size='small' aria-label='Change view'>
						<Button size='large' disabled={view === View.Grid} onClick={changeView(View.Grid)}>
							<ViewModuleIcon />
						</Button>
						<Button size='large' disabled={view === View.List} onClick={changeView(View.List)}>
							<ViewListIcon />
						</Button>
					</ButtonGroup>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Toolbar;