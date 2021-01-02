import create from 'zustand';
import { SettingsInterface } from '@/interfaces';
import { updateSettings } from '@/services/settings.service';

type State = {
  settings: Map<string, SettingsInterface>;
  setSetting: (key: string, value: any) => void;
  setSettings: (updatedSettings: Map<string, SettingsInterface>) => void;
  getSetting: (key: string) => any;
};

const useStore = create<State>((set, get) => ({
  settings: new Map<string, SettingsInterface>(),
  setSetting: (key: string, value: SettingsInterface) =>
    set(() => {
      let newSettings = new Map(get().settings);
      newSettings.set(key, value);
      updateSettings(newSettings);
      return { settings: newSettings };
    }),
  setSettings: (updatedSettings: Map<string, SettingsInterface>) => set(() => ({ settings: updatedSettings })),
  getSetting: (key: string) => {
    return get().settings.get(key);
  }
}));

export default useStore;
