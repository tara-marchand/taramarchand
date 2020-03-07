import fetch from 'isomorphic-fetch';

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export function getData(contentUrl: string, controller: AbortController) {
  const signal = controller.signal;

  try {
    // Fetch the content & use the signal for aborting
    return new Promise(resolve => {
      fetch(contentUrl, {
        signal
      }).then((response: any) => {
        resolve(response);
      });
    });
  } catch (err) {
    // Avoid showing an error message if the fetch was aborted
    if (err.name !== 'AbortError') {
      console.warn('Oh no! Fetching failed.');
    }
  }
}

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('static/worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  }
}
