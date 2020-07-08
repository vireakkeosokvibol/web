import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppActionTypes } from './app.action';

interface dataState {
  data: string;
}

export interface AppState {
  data: dataState;
}

function dataReducer(state: dataState, action): dataState {
  switch (action.type) {
    case AppActionTypes.AppAction:
      return {
        data: action.payload.data
      }
    default:
      return {
        data: '',
      }
  }
}

export const reducers: ActionReducerMap<AppState> = {
  data: dataReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
