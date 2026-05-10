import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from '@angular/fire/auth';
import firebase from "firebase/compat/app";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error en registro', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error en login', error);
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      throw error;
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    } catch (error) {
      console.error('Error con Google Sign-In', error);
      throw error;
    }
  }
}
