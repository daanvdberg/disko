import React from 'react';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Theme,
	Typography
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import AlbumIcon from '@material-ui/icons/Album';
import { useNavigate } from 'react-router-dom';
import { Release as IRelease } from '../../types';

const useStyles = makeStyles(({ spacing }: Theme) =>
	createStyles({
		root: {
			position: 'relative',
			maxWidth: 345,
			borderRadius: 10
		},
		media: {
			paddingTop: '90%',
			margin: spacing(1.5, 1.5, 0),
			borderRadius: 8
		},
		actions: {
			position: 'absolute',
			top: 0,
			right: 0,
			left: 0,
			display: 'flex',
			justifyContent: 'flex-end',
			padding: spacing(2)
		}
	})
);

function Release({ id, cover_image, thumb, title, artists, type, uri }: Props) {

	const c = useStyles();

	let navigate = useNavigate();

	const handleViewDetails = () => navigate(`/${type}/${id}`);

	const handleRedirectToDiscogs = () => {
		const win = window.open(uri, '_blank');
		if (win != null) {
			win.focus();
		}
	}

	return (
		<Card className={c.root}>
			<CardActionArea onClick={handleViewDetails}>
				{(cover_image || thumb) &&
					<CardMedia
						className={c.media}
						image={cover_image || thumb}
						title={title}
					/>
				}
				<CardContent>
					<Typography gutterBottom variant='h6' component='h2'>
						{title}
					</Typography>
					{artists && artists[0] &&
						<Typography variant='body2' color='textSecondary' component='p'>
							{artists[0].name}
						</Typography>
					}
				</CardContent>
			</CardActionArea>
			{uri &&
				<CardActions className={c.actions}>
					<IconButton aria-label='View on Discogs' color='secondary' onClick={handleRedirectToDiscogs}>
						<AlbumIcon />
					</IconButton>
				</CardActions>
			}
		</Card>
	);
}

interface Props extends IRelease {
	type: 'release' | 'master' | 'artist';
}

export default Release;