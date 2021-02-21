import React from 'react';
import { AppBar, Button, Container, Box, Link, Toolbar, Typography, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Routes, Link as RouterLink } from 'react-router-dom';
import Artist from './pages/Artist';
import Collection from './pages/Collection';
import Master from './pages/Master';
import NotFound from './pages/NotFound';
import Release from './pages/Release';
import Wishlist from './pages/Wishlist';
import Header from './components/Header';

const useStyles = makeStyles(({ spacing, palette }: Theme) =>
	createStyles({
		appBar: {
			borderBottom: `1px solid ${palette.divider}`,
		},
		toolbar: {
			flexWrap: 'wrap',
		},
		toolbarTitle: {
			flexGrow: 1,
		},
		link: {
			margin: spacing(1, 1.5),
		}
	})
);

function App() {

	const c = useStyles();

	return (
		<Router>

			<AppBar position='static' color='default' elevation={0} className={c.appBar}>
				<Toolbar className={c.toolbar}>
					<Typography variant='h6' color='inherit' noWrap className={c.toolbarTitle}>
						DISKO
					</Typography>
					<nav>
						<Link component={RouterLink} variant='button' color='textPrimary' to='/' className={c.link}>
							Collection
						</Link>
						<Link component={RouterLink} variant='button' color='textPrimary' to='/wishlist' className={c.link}>
							Wishlist
						</Link>
					</nav>
					<Button href='#' color='primary' variant='outlined' className={c.link}>
						Spotify Login
					</Button>
				</Toolbar>
			</AppBar>

			<Routes>
				<Route path='/' element={<Header>Collection</Header>} />
				<Route path='/wishlist' element={<Header>Wishlist</Header>} />
			</Routes>

			<Box py={4}>
				<Container maxWidth='lg' component='main'>

					<Routes>
						<Route path='/' element={<Collection />} />
						<Route path='/wishlist' element={<Wishlist />} />
						<Route path='/release/:id' element={<Release />} />
						<Route path='/master/:id' element={<Master />} />
						<Route path='/artist/:id' element={<Artist />} />
						<Route path='*' element={<NotFound />} />
					</Routes>

				</Container>
			</Box>

		</Router>
	);
}

export default App;
