console.log('SW Loaded...')

self.addEventListener('push', e => {
  const data = e.data.json()
  console.log('Push Received...');

  console.log(data)

  self.registration.showNotification(data.title, {
    body: 'Notified!!!',
    icon: 'https://www.extremetech.com/wp-content/uploads/2019/12/SONATA-hero-option1-764A5360-edit.jpg',
  });


  console.log('Push OK...');
})
