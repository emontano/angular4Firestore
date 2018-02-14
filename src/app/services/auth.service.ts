import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth} from 'angularfire2/auth';
import { User } from '../models/User';

@Injectable()
export class AuthService {

  constructor(private afAuth:AngularFireAuth) { }

  register(user:User){
    return new Promise((resolve,reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password).
      then(userData => resolve(userData), err=> reject(err))
    });
  }

  login(user:User){
    return new Promise((resolve,reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password).
      then(userData => resolve(userData), err=> reject(err))
    });
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  getAuth(){
    return this.afAuth.authState.map(auth => auth);
  }

}
