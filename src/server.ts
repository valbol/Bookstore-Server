import createApp from './app';
//TODO: add ==> import './envVars';
import log from './logger';

const app = createApp();
const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  log.info(`App is running in port ${port} in ${app.get('env')} mode`);
  log.info('Press CTRL-C to stop');
});
