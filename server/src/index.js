const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const cookieparser = require('cookie-parser');
const route = require('./routes');
const app = express();

app.use(cookieparser('shop%#!@&&*$%#!^$F&*GIUUY*&^*&^'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine(
	'hbs',
	exphbs({
		extname: '.hbs',
		helpers: {
			toLocaleString: a => Number(a).toLocaleString('da-DK'),
		},
	}),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
route(app);
const port = process.env.PORT || 2000;
app.listen(port, () =>
	console.log(`App listening at http://localhost:${port}`),
);
