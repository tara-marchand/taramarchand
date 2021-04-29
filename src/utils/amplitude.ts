import amplitude from 'amplitude-js';

let amplitudeInstance: amplitude.AmplitudeClient | undefined;

if (window && process.env.NODE_ENV === 'development') {
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

export const getAmplitudeInstance = () => amplitudeInstance;
