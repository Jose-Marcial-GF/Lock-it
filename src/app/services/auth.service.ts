import {inject, Injectable} from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  getCurrentUser() {
    return this.auth.currentUser;
  }

  async updateUserProfile(photoURL: string) {
    const user = this.auth.currentUser;
    if (user) await updateProfile(user as any, { photoURL });
  }

  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth as any, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error en registro', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth as any, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error en login', error);
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.auth as any);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      throw error;
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth as any, provider);
      return result.user;
    } catch (error) {
      console.error('Error con Google Sign-In', error);
      throw error;
    }
  }

  getUserState() {
    return authState(this.auth as any);
  }
}
