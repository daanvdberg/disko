import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Theme,
	Typography
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Release as IRelease } from '../../types';

const useStyles = makeStyles(({ spacing, palette }: Theme) =>
	createStyles({
		root: {
			maxWidth: 345
		},
		media: {
			paddingTop: '75%'
		}
	})
);

function Release({ id, cover_image, thumb, title, artists, type }: Props) {

	const c = useStyles();

	let navigate = useNavigate();

	const handleViewDetails = () => navigate(`/${type}/${id}`);

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
					<Typography gutterBottom variant='h5' component='h2'>
						{title}
					</Typography>
					{artists && artists[0] &&
						<Typography variant='body2' color='textSecondary' component='p'>
							{artists[0].name}
						</Typography>
					}
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size='small' color='primary' onClick={handleViewDetails}>
					Details
				</Button>
				<Button size='small' color='primary'>
					View on Discogs
				</Button>
			</CardActions>
		</Card>
	);
}

interface Props extends IRelease {
	type: 'release' | 'master' | 'artist';
}

export default Release;