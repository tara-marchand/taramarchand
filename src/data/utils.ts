import fetch from 'isomorphic-fetch';

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export function isProd() {
  return process.env.NODE_ENV === 'production';
}

export function getData(
  contentUrl: string,
  controller: AbortController
): Promise<Response> | void {
  const signal = controller.signal;

  try {
    // Fetch the content & use the signal for aborting
    return new Promise((resolve, reject) => {
      fetch(contentUrl, {
        signal,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((reason): void => {
          console.error(reason);
          reject();
        });
    });
  } catch (err) {
    // Avoid showing an error message if the fetch was aborted
    if (err.name !== 'AbortError') {
      console.warn('Oh no! Fetching failed.');
      return;
    }
  }
}
