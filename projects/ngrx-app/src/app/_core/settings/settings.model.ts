import { IAppState } from '../core.state';

export const NIGHT_MODE_THEME = 'BLACK-THEME';

export interface ISettingsState {
	theme: string;
	autoNightMode: boolean;
	nightTheme: string;
	hour: number;
	stickyHeader: boolean;
	pageAnimations: boolean;
	pageAnimationsDisabled: boolean;
	elementsAnimations: boolean;
}

export interface IState extends IAppState {
	settings: ISettingsState;
}
