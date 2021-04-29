import { AmplitudeClient } from 'amplitude-js';

let amplitudeInstance: AmplitudeClient | undefined;

if (window && process.env.NODE_ENV === 'production') {
  import('amplitude-js').then((amp) => {
    const ampApiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    if (!ampApiKey) {
      return;
    }
console.log(ampApiKey)
    amplitudeInstance = amp.getInstance(ampApiKey);
    amplitudeInstance.init(ampApiKey, undefined, {
      includeUtm: true,
      includeReferrer: true,
    });

    const identify = new amplitudeInstance.Identify();
    amplitudeInstance.identify(identify);
  });
}

export { amplitudeInstance };
