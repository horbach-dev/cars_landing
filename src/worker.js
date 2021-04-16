console.log('SW Loaded...')

self.addEventListener('push', e => {
  const data = e.data.json()
  console.log('Push Received...');

  const options = {
    body: 'Notified!!!',
    icon: 'https://www.extremetech.com/wp-content/uploads/2019/12/SONATA-hero-option1-764A5360-edit.jpg',
  }

  console.log(data);

  e.waitUntil(self.registration.showNotification(data.title, options));
})
