let amplitudeInstance: AmplitudeClient | undefined;

if (
  window &&
  process.env.NODE_ENV === 'production' &&
  process.env.AMPLITUDE_API_KEY
) {
  import('amplitude-js').then((amp) => {
    amplitudeInstance = amp.getInstance(process.env.AMPLITUDE_API_KEY);

    amplitudeInstance.init(process.env.AMPLITUDE_API_KEY, undefined, {
      includeUtm: true,
      includeReferrer: true,
    });
  });
}

export { amplitudeInstance };
