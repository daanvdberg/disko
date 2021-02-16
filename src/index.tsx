import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import compose from 'jss-plugin-compose';
import App from './App';
import theme from './theme';

// Add support for JSS Compose: https://cssinjs.org/jss-plugin-compose
const jss = create({
	plugins: [...jssPreset().plugins, compose()],
});

// TODO
// 1. Add simple NodeJS backend to obfuscate API calls
// 2. Include identifying User-Agent string
//    https://www.discogs.com/developers#page:home,header:home-general-information

ReactDOM.render(
	<React.StrictMode>
		<StylesProvider jss={jss}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</StylesProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
