import { AppState } from '../core.state';

export const NIGHT_MODE_THEME = 'BLACK-THEME';

export interface SettingsState {
  theme: string;
  autoNightMode: boolean;
  nightTheme: string;
  hour: number;
  stickyHeader: boolean;
}

export interface State extends AppState {
  settings: SettingsState;
}
