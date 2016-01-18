import helmet     from 'helmet';
import { Router } from 'express';

let app = Router();

const trusted = [
  "'self'"
];

// Helmet configurations
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.noSniff())

export default app;
