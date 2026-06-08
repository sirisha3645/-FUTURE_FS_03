/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './config';

const COLLECTION_NAME = 'subscribers';

export interface Subscriber {
  email: string;
  subscriptionDate: string;
}

/**
 * Saves a newsletter subscriber to Firestore.
 * Uses a safe email string sanitize or hash as document ID, or autoID. We'll use a sanitized email ID to avoid duplicates.
 */
export async function addSubscriber(email: string): Promise<void> {
  try {
    // Sanitize email as a document ID (replace dots, slashes, or special characters, or use setDoc with a normalized string)
    const normalizedEmail = email.trim().toLowerCase();
    const docId = normalizedEmail.replace(/[^a-zA-Z0-9_\-]+/g, '_');
    const docRef = doc(db, COLLECTION_NAME, docId);
    await setDoc(docRef, {
      email: normalizedEmail,
      subscriptionDate: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, COLLECTION_NAME);
  }
}

/**
 * Retrieves all subscribers.
 */
export async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('subscriptionDate', 'desc'));
    const querySnapshot = await getDocs(q);
    const subscribers: Subscriber[] = [];
    querySnapshot.forEach((doc) => {
      subscribers.push(doc.data() as Subscriber);
    });
    return subscribers;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
  }
}

/**
 * Deletes a subscriber record.
 */
export async function deleteSubscriber(email: string): Promise<void> {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const docId = normalizedEmail.replace(/[^a-zA-Z0-9_\-]+/g, '_');
    const docRef = doc(db, COLLECTION_NAME, docId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${email}`);
  }
}

/**
 * Real-time subscription to newsletter subscribers.
 */
export function subscribeSubscribers(onNext: (subscribers: Subscriber[]) => void, onError?: (err: Error) => void) {
  const q = query(collection(db, COLLECTION_NAME), orderBy('subscriptionDate', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const subscribers: Subscriber[] = [];
    snapshot.forEach((doc) => {
      subscribers.push(doc.data() as Subscriber);
    });
    onNext(subscribers);
  }, (error) => {
    if (onError) {
      onError(error);
    } else {
      handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
    }
  });
}
