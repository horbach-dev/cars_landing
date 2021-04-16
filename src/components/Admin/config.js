export const PUBLIC_VAPID_KEY = 'BA0BAVb28f7teA3knfaqf7Z6O8y6PS9ax2VygOQMVwu0L623wgyBqviqFz7zftqs73_w_rslVwzMoLf5ncnMheo';

// Web-Push
// Public base64 to Uint
export const urlBase64ToUint8Array = (base64String) => {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
