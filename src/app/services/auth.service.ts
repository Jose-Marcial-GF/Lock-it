import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
// Importamos todo de la versión modular moderna (y borramos las líneas de "compat")
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async register(email: string, password: string) {
    try {
      // Añadimos "as any" a this.auth para esquivar el choque de versiones
      const userCredential = await createUserWithEmailAndPassword(this.auth as any, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error en registro', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      // Añadimos "as any"
      const userCredential = await signInWithEmailAndPassword(this.auth as any, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error en login', error);
      throw error;
    }
  }

  async logout() {
    try {
      // Añadimos "as any"
      await signOut(this.auth as any);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      throw error;
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      // Añadimos "as any"
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
