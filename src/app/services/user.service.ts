import { inject, Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { UserItem } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private firestore = inject(Firestore);

  saveUser(user: UserItem): Promise<void> {
    return setDoc(doc(this.firestore, `users/${user.uid}`), user);
  }
}
