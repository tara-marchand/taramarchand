import fetch from 'isomorphic-fetch';

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export async function getData(contentUrl: string, controller: AbortController) {
  const signal = controller.signal;

  try {
    // Fetch the content & use the signal for aborting
    return await fetch(contentUrl + `?$limit=100`, {
      signal
    });
  } catch (err) {
    // Avoid showing an error message if the fetch was aborted
    if (err.name !== 'AbortError') {
      console.warn('Oh no! Fetching failed.');
    }
  }
}
