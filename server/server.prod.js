import express      from 'express';
import compression  from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import path         from 'path';
import dotenv       from 'dotenv';
import helmetConfig from './helmet/helmetConfig.js';
import appSpecificRoutes from './routes/appSpecificRoutes.js';
import staticRoutes from './routes/staticRoutes.js';

// reading/serving .env file for process.env
dotenv.load();

// express server initiation
let app = express();

app.use(helmetConfig);

// expressjs plugins configurations
app.set('trust proxy', 'loopback');
app.disable('x-powered-by');
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// setting view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.use(staticRoutes);
app.use(appSpecificRoutes);

// listening server at defined port
app.listen(process.env.PORT, () => {
  console.log(`App is now running on http://localhost:${process.env.PORT}`);
});
