import create from 'zustand';
import { SettingsInterface } from '@/interfaces';
import { updateSettings } from '@/services/settings.service';

interface User {
  isAuthenticated: boolean;
}

type State = {
  currentUser: User;
  settings: Map<string, SettingsInterface>;
  setSetting: (key: string, value: any) => void;
  setCurrentUser: (updatedUser: User) => void;
  setSettings: (updatedSettings: Map<string, SettingsInterface>) => void;
  getSetting: (key: string) => any;
};

const useStore = create<State>((set, get) => ({
  currentUser: { isAuthenticated: false },
  settings: new Map<string, SettingsInterface>(),
  setCurrentUser: (updatedUser: User) => set(() => ({ currentUser: updatedUser })),
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
