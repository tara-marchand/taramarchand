import { AmplitudeClient } from 'amplitude-js';

let amplitudeInstance: AmplitudeClient | undefined;

if (window && process.env.NODE_ENV === 'production') {
  import('amplitude-js').then((amp) => {
    const { AMPLITUDE_API_KEY } = process.env;
    if (!AMPLITUDE_API_KEY) {
      return;
    }

    amplitudeInstance = amp.getInstance(process.env.AMPLITUDE_API_KEY);
    amplitudeInstance.init(AMPLITUDE_API_KEY, undefined, {
      includeUtm: true,
      includeReferrer: true,
    });
  });
}

export { amplitudeInstance };
