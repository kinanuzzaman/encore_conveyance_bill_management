import { boot } from 'quasar/wrappers';
import { io } from 'socket.io-client';

export default boot(({ app }) => {
  const socket = io('https://encore-api-production.up.railway.app/notify');
  app.config.globalProperties.$socket = socket;
});
