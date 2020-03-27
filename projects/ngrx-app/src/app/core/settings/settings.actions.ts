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
)