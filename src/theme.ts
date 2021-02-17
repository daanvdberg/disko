import { createMuiTheme } from '@material-ui/core/styles';

const baseFonts = [
	'Montserrat',
	'-apple-system',
	'BlinkMacSystemFont',
	'"Segoe UI"',
	'Roboto',
	'"Helvetica Neue"',
	'Arial',
	'sans-serif',
	'"Apple Color Emoji"',
	'"Segoe UI Emoji"',
	'"Segoe UI Symbol"'
];

const bodyFontFamily = baseFonts.join(',');
baseFonts.unshift('Asap');
const fontFamily = baseFonts.join(',');

console.log();

const theme = createMuiTheme({
	typography: {
		fontFamily: bodyFontFamily,
		h1: {
			fontFamily,
			fontSize: 42,
			fontWeight: 400
		},
		h2: {
			fontFamily,
			fontSize: 36,
			fontWeight: 400
		},
		h3: {
			fontFamily,
			fontSize: 30,
			fontWeight: 400
		},
		h4: {
			fontFamily,
			fontSize: 26,
			fontWeight: 600
		},
		h5: {
			fontSize: 22,
			fontWeight: 500
		},
		h6: {
			fontSize: 18,
			fontWeight: 500
		},
		subtitle1: {
			fontSize: 15,
			fontWeight: 500
		},
		subtitle2: {
			fontSize: 14,
			fontWeight: 500
		},
		body1: {
			fontSize: 15,
			fontWeight: 400
		},
		body2: {
			fontSize: 14,
			fontWeight: 400
		},
		button: {
			fontFamily,
			fontSize: 14,
			fontWeight: 500
		},
		caption: {
			fontSize: 12,
			fontWeight: 300
		}
	},
	overrides: {
		MuiPaper: {
			elevation1: {
				boxShadow: '2px 2px 14px 0 rgba(0, 0, 0, 0.05), 2px 2px 10px 0 rgba(0, 0, 0, 0.05), 1px 1px 4px 0 rgba(0, 0, 0, 0.05)'
			}
		}
	}
});

export default theme;