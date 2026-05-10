import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
  query,
  where,
  docData,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {PasswordItem} from "../models/password.model";


@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor(private firestore: Firestore) { }

  getPasswordById(passwordId: string): Observable<PasswordItem> {
    const docRef = doc(this.firestore, `passwords/${passwordId}`);
    return docData(docRef, { idField: 'id' }) as Observable<PasswordItem>;
  }

  async updatePassword(passwordId: string, data: Partial<PasswordItem>) {
    const docRef = doc(this.firestore, `passwords/${passwordId}`);
    return updateDoc(docRef, data);
  }

  async deletePassword(passwordId: string) {
    const docRef = doc(this.firestore, `passwords/${passwordId}`);
    return deleteDoc(docRef);
  }

  getUserPasswords(userId: string): Observable<PasswordItem[]> {
    const pwdRef = collection(this.firestore, 'passwords');
    const q = query(pwdRef, where('userId', '==', userId));

    return (collectionData(q, { idField: 'id' }) as Observable<PasswordItem[]>).pipe(
      map(passwords => passwords.sort((a, b) => {

        return (a.isPinned === b.isPinned) ? 0 : a.isPinned ? -1 : 1;
      }))
    );
  }

  async togglePin(passwordId: string, currentStatus: boolean) {
    const docRef = doc(this.firestore, `passwords/${passwordId}`);
    return updateDoc(docRef, { isPinned: !currentStatus });
  }
}
