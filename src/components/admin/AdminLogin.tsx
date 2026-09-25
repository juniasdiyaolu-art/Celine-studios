import React, { useState } from 'react';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ArrowLeft
} from 'lucide-react';
import { authenticateAdmin, resetAdminPassword, getStoredAdminCredentials } from '../../utils/adminAuth';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToSite?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToSite }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [newResetPassword, setNewResetPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [forgotFeedback, setForgotFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!identifier.trim() || !password.trim()) {
      setErrorMsg('Please provide both your staff Email/Username and password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = authenticateAdmin(identifier, password, rememberMe);
      setIsSubmitting(false);

      if (result.success) {
        onSuccess();
      } else {
        setErrorMsg(result.message || 'Authentication failed. Please check credentials.');
      }
    }, 200);
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotFeedback(null);

    if (!forgotEmail.trim() || !newResetPassword.trim()) {
      setForgotFeedback({
        type: 'error',
        text: 'Please enter your administrator email and a new password (min 6 characters).'
      });
      return;
    }

    const res = resetAdminPassword(forgotEmail, newResetPassword);
    if (res.success) {
      setForgotFeedback({
        type: 'success',
        text: res.message
      });
      setTimeout(() => {
        setShowForgotModal(false);
        setPassword(newResetPassword);
        setIdentifier(forgotEmail);
        setForgotFeedback(null);
      }, 1500);
    } else {
      setForgotFeedback({
        type: 'error',
        text: res.message
      });
    }
  };

  // Helper to autofill development credentials for quick access during evaluation
  const handleAutofillDevCredentials = () => {
    const creds = getStoredAdminCredentials();
    setIdentifier(creds.email);
    setPassword(creds.passwordHash || 'celine2025!');
    setErrorMsg(null);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#09090c] px-4 py-12">
      <div className="w-full max-w-md bg-[#121217] border border-[#262632] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle accent border at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />

        {/* Back to site button */}
        {onBackToSite && (
          <button
            type="button"
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 text-xs text-[#8e8c85] hover:text-[#f5f3ef] transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Celine Studio</span>
          </button>
        )}

        {/* Header Branding */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#c5a880]/15 border border-[#c5a880]/30 text-[#c5a880] flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#f5f3ef] tracking-[0.15em] uppercase font-medium">
              CELINE STUDIO
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mt-1">
              Admin Portal
            </p>
          </div>

          <p className="text-xs text-[#9f9d96] max-w-xs mx-auto leading-relaxed pt-1">
            Private atelier dashboard for bespoke commissions, client CRM, fittings, and product management.
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-medium block">{errorMsg}</span>
              <button
                type="button"
                onClick={handleAutofillDevCredentials}
                className="underline text-red-200 text-[11px] hover:text-white"
              >
                Use demo staff credentials
              </button>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Email / Username */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#a2a099] font-medium mb-2">
              Email / Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#716f69]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={identifier}
                onChange={e => {
                  setIdentifier(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="admin@celinestudio.ng or admin"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0b0b0e] border border-[#252530] text-sm text-[#f5f3ef] placeholder-[#5c5a54] focus:outline-none focus:border-[#c5a880] transition-colors"
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password with Visibility Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs uppercase tracking-wider text-[#a2a099] font-medium">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs text-[#c5a880] hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#716f69]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#0b0b0e] border border-[#252530] text-sm text-[#f5f3ef] placeholder-[#5c5a54] focus:outline-none focus:border-[#c5a880] transition-colors"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#7e7c75] hover:text-[#f5f3ef] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Keep me signed in */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-[#0b0b0e] border-[#252530] text-[#c5a880] accent-[#c5a880] focus:ring-0"
              />
              <span className="text-xs text-[#9f9d96]">Keep me signed in</span>
            </label>

            <button
              type="button"
              onClick={handleAutofillDevCredentials}
              className="text-[11px] text-[#8e8c85] hover:text-[#c5a880] transition-colors"
              title="Click to fill development credentials"
            >
              Fill Dev Login
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#d6be9a] transition-all shadow-lg active:scale-98 disabled:opacity-50 mt-2"
          >
            {isSubmitting ? 'Authenticating Atelier Access...' : 'Sign In'}
          </button>
        </form>

        {/* Security Notice Note */}
        <div className="mt-8 pt-5 border-t border-[#1e1e28] text-center">
          <p className="text-[11px] text-[#716f69] leading-relaxed">
            Protected internal route. All access events and administrative modifications are logged for atelier discretion and security.
          </p>
        </div>
      </div>

      {/* Forgot Password / Reset Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#121217] border border-[#2a2a38] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c5a880]/15 text-[#c5a880] flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#f5f3ef] font-medium">Reset Admin Password</h3>
                <p className="text-xs text-[#8e8c85]">Celine Studio Atelier Recovery</p>
              </div>
            </div>

            {forgotFeedback && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  forgotFeedback.type === 'success'
                    ? 'bg-green-950/40 border border-green-800/60 text-green-300'
                    : 'bg-red-950/40 border border-red-800/60 text-red-300'
                }`}
              >
                {forgotFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{forgotFeedback.text}</span>
              </div>
            )}

            <p className="text-xs text-[#9f9d96] leading-relaxed">
              To reset your password, enter your registered administrator email address and your desired new password below.
            </p>

            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1">
                  Administrator Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#716f69] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    placeholder="admin@celinestudio.ng"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0b0b0e] border border-[#252530] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1">
                  New Password (min 6 characters) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#716f69] absolute left-3 top-3" />
                  <input
                    type={showResetPassword ? 'text' : 'password'}
                    required
                    value={newResetPassword}
                    onChange={e => setNewResetPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#0b0b0e] border border-[#252530] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowResetPassword(!showResetPassword)}
                    className="absolute right-3 top-3 text-[#7e7c75] hover:text-[#f5f3ef]"
                  >
                    {showResetPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0b0b0e] border border-[#202028] text-[11px] text-[#8e8c85] space-y-1">
                <p className="font-semibold text-[#dedcd5]">Production Security Notice:</p>
                <p>
                  In a deployed production cluster, reset emails are dispatched through a secure SMTP or Firebase Auth service as detailed in ADMIN_SETUP.md.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotFeedback(null);
                  }}
                  className="px-4 py-2.5 rounded-full text-xs text-[#8e8c85] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs font-semibold uppercase tracking-wider hover:bg-[#d6be9a]"
                >
                  Confirm Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
