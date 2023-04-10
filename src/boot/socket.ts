import { boot } from 'quasar/wrappers';
import { io } from 'socket.io-client';

export default boot(({ app }) => {
  const socket = io('http://localhost:8000/notify');
  app.config.globalProperties.$socket = socket;
});
