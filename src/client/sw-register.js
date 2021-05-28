
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const publicVapidKey = 'BM3ttf2x9KcuUor22H71QRYcbGbmdJOWTk-ZB63MxoLDFOZ9IjJPt0buZ6WE7aU-U9v59qFnn7juj-RPWzC8Avw';

export const getSubscription = async () => {
  if ('serviceWorker' in navigator) {
    const register = await navigator.serviceWorker.register(
      '/sw.js',
      {
        scope: '/'
      }
    );
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    return subscription;
  } else {
    console.error('Service workers are not supported in this browser');
  }
}
