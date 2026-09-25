# CELINE STUDIO — Atelier Admin Portal & Security Guide

## 1. Development & Demo Access

The Celine Studio Management Portal is accessible at `/admin` (or by clicking the **Admin Portal** shield icon in the header or footer).

### Default Development Credentials
- **Portal URL**: `/admin`
- **Administrator Email**: `admin@celinestudio.ng`
- **Username**: `admin`
- **Default Password**: `celine2025!`
- **Role**: Atelier Director

> **Note for Evaluators**: On the login screen, a convenient **"Fill Dev Login"** link is provided to quickly populate these credentials without exposing the password in public view.

---

## 2. Password Management & Security Features

Celine Studio provides a robust administrative password management suite:

1. **Password Visibility Toggle**: Both the Login form and Change Password modal provide visibility toggles (Eye / Eye-off) for secure typing.
2. **In-Portal Password Change**:
   - Navigate to the **Studio Settings** tab in `/admin`.
   - Under **Admin Security & Authentication**, enter the current password and your new chosen password (minimum 6 characters).
   - Click **"Update Admin Password"**. The new password takes effect immediately.
3. **Forgot / Reset Password**:
   - On the login screen, click **"Forgot password?"**.
   - Enter the registered administrator email address (`admin@celinestudio.ng`) and set a new password.
4. **Session Management & Logout**:
   - Admins can check **"Keep me signed in"** to store their authenticated session in `localStorage`, or leave it unchecked for single-session `sessionStorage`.
   - Clicking **"Sign Out"** in the top navigation bar immediately terminates the active session and locks the portal.
5. **Route Guarding**:
   - Any attempt to access `/admin` or administrative modules while unauthenticated automatically routes to the Admin Login screen.

---

## 3. Recommended Production Authentication Setup

For production deployments where external identity providers are desired, integrate one of the following production setups:

### Option A: Firebase Authentication
1. Initialize Firebase Auth SDK.
2. Use `signInWithEmailAndPassword(auth, email, password)`.
3. Use Firebase Admin SDK in server routes to verify ID tokens on requests.
4. Enable Firebase Password Reset email triggers.

### Option B: Server-side HttpOnly Session Cookies (Express)
1. In `server.ts`, create `/api/admin/login` verifying against hashed passwords (using `bcrypt`).
2. Issue an encrypted `HttpOnly`, `SameSite=Strict`, `Secure` JWT session cookie.
3. Guard all administrative endpoints behind authentication middleware.
