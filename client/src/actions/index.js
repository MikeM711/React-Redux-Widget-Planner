import * as widgetDB from './widgetDB';
import * as auth from './auth';
import * as userHist from './userHist';
import * as profile from './profile';

export const fetchWidgetsDB = widgetDB.fetchWidgetsDB;
export const addWidgetDB = widgetDB.addWidgetDB;
export const deleteWidgetDB = widgetDB.deleteWidgetDB;
export const updateWidgetDB = widgetDB.updateWidgetDB;

export const oauthGoogle = auth.oauthGoogle;
export const signUp = auth.signUp;
export const signIn = auth.signIn;
export const signOut = auth.signOut;
export const componentMount = auth.componentMount;

export const addWidgetHist = userHist.addWidgetHist;
export const deleteWidgetHist = userHist.deleteWidgetHist;

export const fetchProfile = profile.fetchProfile;
export const addResultToProfile = profile.addResultToProfile;
export const deleteProfileResult = profile.deleteProfileResult;