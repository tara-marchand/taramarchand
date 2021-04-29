import amplitude, { AmplitudeClient } from 'amplitude-js';

let amplitudeInstance: AmplitudeClient | undefined;

if (window && process.env.NODE_ENV === 'production') {
  const ampApiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  if (ampApiKey) {
    amplitudeInstance = amplitude.getInstance(ampApiKey);
    amplitudeInstance.init(ampApiKey, undefined, {
      includeUtm: true,
      includeReferrer: true,
    });

    const identify = new amplitudeInstance.Identify();
    amplitudeInstance.identify(identify);
  }
}

export { amplitudeInstance };
