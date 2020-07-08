import { Action } from '@ngrx/store';

export enum AppActionTypes {
  AppAction = '[App] Action'
}

export class AppStore implements Action {
  readonly type = AppActionTypes.AppAction;
  constructor(public payload: {data: string}) {}
}

export type AppActions = AppStore;