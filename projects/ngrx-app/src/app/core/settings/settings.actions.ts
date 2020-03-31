import { createAction, props } from '@ngrx/store';

export const changeTheme = createAction(
	'[Settings] Change Theme',
	props<{ theme: string }>()
);

export const changeAutoNightMode = createAction(
	'[Settings] Change Auto Night Mode',
	props<{ autoNightMode: boolean }>()
);

export const changeHour = createAction(
	'[Settings] Change Hour',
	props<{ hour: number }>()
);

export const changeStickyHeader = createAction(
	'[Settings] Change Sticky Header',
	props<{ stickyHeader: boolean }>()
);

export const changePageAnimations = createAction(
	'[Settings] Change Page Animations',
	props<{ pageAnimations: boolean }>()
);

export const changePageAnimationsDisabled = createAction(
	'[Settings] Change Page Animations Disabled',
	props<{ pageAnimationsDisabled: boolean }>()
);

export const changeElementsAnimations = createAction(
	'[Settings] Change Elements Animations',
	props<{ elementsAnimations: boolean }>()
);
