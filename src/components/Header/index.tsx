import React from 'react';
import { Box, Theme, Typography, useTheme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(({ palette, typography }: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100vw',
			height: 220
		},
		inner: {
			color: palette.common.white,
			fontWeight: typography.fontWeightBold,
			'& svg': {
				width: 320,
				height: 100,
			}
		}
	})
);

const Header = ({ children }: Props) => {

	const c = useStyles();
	const theme = useTheme();

	return (
		<Box
			component='section'
			className={c.root}
			style={{ 'background': `${theme.palette.grey[400]} center / cover no-repeat url('https://picsum.photos/1920/220/?blur=7')` }}
		>
			<Typography variant='h1' className={c.inner}>
				<svg>
					<defs>
						<g id='text'>
							<text x='50%' y='64%' textAnchor='middle'>{children}</text>
						</g>
						<mask id='mask' x='0' y='0' width='100%' height='100%'>
							<rect x='0' y='0' width='100%' height='100%' fill='#fff' />
							<use href='#text' />
						</mask>
					</defs>
					<rect width='100%' height='100%' mask='url(#mask)' fillOpacity='0.65' fill='#000' />
					<use href='#text' mask='url(#mask)' />
				</svg>
			</Typography>
		</Box>
	);
};

interface Props {
	children?: string;
}

export default Header;