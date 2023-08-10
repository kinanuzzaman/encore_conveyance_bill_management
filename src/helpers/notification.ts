function requestNotificationPermission(): Promise<NotificationPermission> {
  return new Promise((resolve, reject) => {
    if (!('Notification' in window)) {
      alert('Your browser does not support system notifications');
      reject('unsupported');
    } else if (Notification.permission === 'granted') {
      resolve(Notification.permission);
    } else if (Notification.permission === 'denied') {
      reject('denied');
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          resolve(permission);
        } else {
          reject(permission);
        }
      });
    }
  });
}

export function showNotification(
  title: string,
  options?: NotificationOptions
): Notification | void {
  // Request permission if necessary
  requestNotificationPermission()
    .then((permission) => {
      if (permission === 'granted') {
        const notification = new Notification(title, options);
        return notification;
      }
    })
    .catch((reason) => {
      if (reason === 'denied') {
        alert('Notification permission has been denied by the user');
      } else {
        console.warn('Failed to request notification permission:', reason);
      }
    });
}
