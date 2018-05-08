import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { TaskListPage } from '../pages/tastlist/tasklist';

export const firebaseConfig = {
  apiKey: 'AIzaSyC9FWteLkVX9VCqrJXLh-OGJTHerx7lKew',
  authDomain: 'ionic2do-22e9a.firebaseapp.com',
  databaseURL: 'https://ionic2do-22e9a.firebaseio.com',
  projectId: 'ionic2do-22e9a',
  storageBucket: 'ionic2do-22e9a.appspot.com',
  messagingSenderId: '473233055877',
};

@NgModule({
  declarations: [MyApp, TaskListPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, TaskListPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ],
})
export class AppModule {}
