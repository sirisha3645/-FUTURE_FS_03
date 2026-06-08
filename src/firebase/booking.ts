/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './config';
import { Booking } from '../types';

const COLLECTION_NAME = 'appointments';

/**
 * Saves a new appointment booking to Firestore.
 */
export async function createBooking(bookingData: Omit<Booking, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      customerName: bookingData.customerName,
      phone: bookingData.phone,
      email: bookingData.email,
      serviceId: bookingData.serviceId,
      serviceName: bookingData.serviceName,
      stylistId: bookingData.stylistId,
      stylistName: bookingData.stylistName,
      date: bookingData.date,
      time: bookingData.time,
      notes: bookingData.notes || '',
      status: bookingData.status,
      price: bookingData.price,
      createdAt: bookingData.createdAt || new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, COLLECTION_NAME);
  }
}

/**
 * Fetches all appointments ordered by creation date descending.
 */
export async function getBookings(): Promise<Booking[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const bookings: Booking[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      bookings.push({
        id: doc.id,
        ...data
      } as Booking);
    });
    return bookings;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
  }
}

/**
 * Updates an appointment's booking status.
 */
export async function updateBookingStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${id}`);
  }
}

/**
 * Deletes an appointment booking record.
 */
export async function deleteBooking(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${id}`);
  }
}

/**
 * Real-time subscription to appointments list.
 */
export function subscribeBookings(onNext: (bookings: Booking[]) => void, onError?: (err: Error) => void) {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const bookings: Booking[] = [];
    snapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      } as Booking);
    });
    onNext(bookings);
  }, (error) => {
    if (onError) {
      onError(error);
    } else {
      handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
    }
  });
}
