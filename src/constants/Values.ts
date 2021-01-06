const asyncStorageBase = '@vivifiiy-alarm-app';

export const storageKeys: { [key: string]: string } = {
  alarms: `${asyncStorageBase}/alarms`,
  settings: `${asyncStorageBase}/settings`,
  credentials: `${asyncStorageBase}/credenti`
};

export const smallScreenWidthBreakpoint = 400;
export const largeScreenWidthBreakpoint = 800;
export default {
  fontSizes: {
    title1: 48,
    title2: 40,
    title3: 34,
    title4: 28,
    title5: 22,
    title6: 20,
    headline: 17,
    body: 17,
    callout: 16,
    subhead: 15,
    footnote: 13,
    caption: 12
  }
};
