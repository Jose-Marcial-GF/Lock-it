import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
  query,
  where,
  docData,
  deleteDoc,
  addDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PasswordItem } from '../models/password.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private firestore = inject(Firestore);

  async addPassword(data: Omit<PasswordItem, 'id' | 'isPinned'>): Promise<string> {
    const pwdRef = collection(this.firestore, 'passwords');
    const docRef = await addDoc(pwdRef, data);
    return docRef.id;
  }

  getPasswordById(passwordId: string): Observable<PasswordItem> {
    const docRef = doc(this.firestore, `passwords/${passwordId}`);
    return docData(docRef as any, { idField: 'id' }) as Observable<PasswordItem>;
  }

  async updatePassword(passwordId: string, data: Partial<Omit<PasswordItem, 'isPinned'>>) {
    const docRef = doc(this.firestore, `passwords/${passwordId}`);
    return updateDoc(docRef, data as any);
  }

  async deletePassword(passwordId: string) {
    const docRef = doc(this.firestore, `passwords/${passwordId}`);
    return deleteDoc(docRef);
  }

  getUserPasswords(userId: string): Observable<PasswordItem[]> {
    const pwdRef = collection(this.firestore, 'passwords');
    const q = query(pwdRef, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<PasswordItem[]>;
  }
}
