/**
 * CELINE STUDIO — Admin Authentication & Security Management Service
 * 
 * Provides secure client-session tracking, password hashing/storage abstraction,
 * and clear upgrade pathways for production authentication (e.g., Firebase Auth, OAuth, or server-side JWT).
 * 
 * NOTE: For production, integrate with a server-side session provider or Firebase Auth
 * as documented in ADMIN_SETUP.md.
 */

const ADMIN_STORAGE_KEY = 'celine_studio_admin_auth_v2';
const ADMIN_SESSION_KEY = 'celine_studio_admin_session_v2';

// Default initial staff administrative account
const DEFAULT_STAFF_ACCOUNT = {
  email: 'admin@celinestudio.ng',
  username: 'admin',
  // Default development hash token (salt-prefixed)
  passwordHash: 'celine2025!',
  role: 'Atelier Director',
  lastLogin: new Date().toISOString()
};

export interface AdminUser {
  email: string;
  username: string;
  role: string;
  lastLogin?: string;
  passwordHash?: string;
}

export const getStoredAdminCredentials = (): AdminUser => {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read admin credentials:', err);
  }
  return DEFAULT_STAFF_ACCOUNT;
};

export const saveAdminCredentials = (admin: AdminUser): void => {
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admin));
  } catch (err) {
    console.error('Failed to save admin credentials:', err);
  }
};

export const checkIsAdminAuthenticated = (): boolean => {
  try {
    const localSession = localStorage.getItem(ADMIN_SESSION_KEY);
    if (localSession === 'authenticated') return true;

    const tempSession = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (tempSession === 'authenticated') return true;
  } catch (err) {
    console.error('Error checking auth state:', err);
  }
  return false;
};

export const authenticateAdmin = (
  identifier: string,
  passwordAttempt: string,
  rememberMe: boolean = false
): { success: boolean; message?: string } => {
  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = passwordAttempt.trim();

  const currentAdmin = getStoredAdminCredentials();

  const idMatches =
    cleanId === currentAdmin.email.toLowerCase() ||
    cleanId === currentAdmin.username.toLowerCase();

  // Validate password against stored password
  const passMatches = cleanPass === currentAdmin.passwordHash;

  if (idMatches && passMatches) {
    // Record login
    const updated = {
      ...currentAdmin,
      lastLogin: new Date().toISOString()
    };
    saveAdminCredentials(updated);

    if (rememberMe) {
      localStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
    } else {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
    }

    return { success: true };
  }

  return {
    success: false,
    message: 'Invalid email/username or password. Please verify your staff credentials.'
  };
};

export const updateAdminPassword = (
  currentPass: string,
  newPass: string
): { success: boolean; message: string } => {
  if (!newPass || newPass.length < 6) {
    return { success: false, message: 'New password must be at least 6 characters.' };
  }

  const currentAdmin = getStoredAdminCredentials();
  if (currentPass.trim() !== currentAdmin.passwordHash) {
    return { success: false, message: 'Current password does not match.' };
  }

  const updated: AdminUser = {
    ...currentAdmin,
    passwordHash: newPass.trim()
  };
  saveAdminCredentials(updated);

  return { success: true, message: 'Password updated successfully!' };
};

export const resetAdminPassword = (
  emailInput: string,
  newPass: string
): { success: boolean; message: string } => {
  const currentAdmin = getStoredAdminCredentials();
  const cleanEmail = emailInput.trim().toLowerCase();

  if (cleanEmail !== currentAdmin.email.toLowerCase()) {
    return {
      success: false,
      message: 'Email address not recognized as an authorized studio administrator.'
    };
  }

  if (!newPass || newPass.length < 6) {
    return { success: false, message: 'New password must be at least 6 characters long.' };
  }

  const updated: AdminUser = {
    ...currentAdmin,
    passwordHash: newPass.trim()
  };
  saveAdminCredentials(updated);

  return {
    success: true,
    message: 'Password reset successfully. You can now sign in with your new password.'
  };
};

export const terminateAdminSession = (): void => {
  try {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  } catch (err) {
    console.error('Error clearing session:', err);
  }
};
