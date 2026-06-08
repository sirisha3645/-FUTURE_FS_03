/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from './config';

/**
 * Sign in a user with email and password (for premium admin access).
 */
export async function loginAdmin(email: string, pass: string): Promise<User> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, pass);
    return credential.user;
  } catch (error) {
    console.error('Error logging in admin with email/password:', error);
    throw error;
  }
}

/**
 * Sign out the current user session.
 */
export async function logoutAdmin(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out admin:', error);
    throw error;
  }
}

/**
 * Subscribes to authentication state changes.
 */
export function subscribeAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
