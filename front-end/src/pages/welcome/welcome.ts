import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { MainPage } from '../pages';

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  displayName;

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform
  ) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
    });
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential);
        this.navCtrl.push(MainPage);
      })
    }
    else {
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);
          this.navCtrl.push(MainPage);
        });
    }
  }

  signInWithGoogle() {
    if (this.platform.is('cordova')) {
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential);
        this.navCtrl.push(MainPage);
      })
    }
    else {
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          console.log(res);
          this.navCtrl.push(MainPage);
        });
    }
  }

  signInWithTwitter() {
    if (this.platform.is('cordova')) {
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential);
        this.navCtrl.push(MainPage);
      })
    }
    else {
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then(res => {
          console.log(res);
          this.navCtrl.push(MainPage);
        });
    }
  }

  signInAsGuest() {
    if (this.platform.is('cordova')) {
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential);
        this.navCtrl.push(MainPage);
      })
    }
    else {
      this.afAuth.auth
        .signInAnonymously()
        .then(res => {
          console.log(res);
          this.navCtrl.push(MainPage);
        });
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}
