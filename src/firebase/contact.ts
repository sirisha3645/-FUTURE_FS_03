/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './config';

const COLLECTION_NAME = 'contactMessages';

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

/**
 * Saves a contact form submission to Firestore.
 */
export async function submitContactMessage(message: Omit<ContactMessage, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      name: message.name,
      email: message.email,
      phone: message.phone,
      message: message.message,
      createdAt: message.createdAt || new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, COLLECTION_NAME);
  }
}

/**
 * Gets all contact form submissions ordered by date.
 */
export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const messages: ContactMessage[] = [];
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      } as ContactMessage);
    });
    return messages;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
  }
}

/**
 * Deletes a contact message record.
 */
export async function deleteContactMessage(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${id}`);
  }
}

/**
 * Real-time subscription to contact messages.
 */
export function subscribeContactMessages(onNext: (messages: ContactMessage[]) => void, onError?: (err: Error) => void) {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const messages: ContactMessage[] = [];
    snapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      } as ContactMessage);
    });
    onNext(messages);
  }, (error) => {
    if (onError) {
      onError(error);
    } else {
      handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
    }
  });
}
