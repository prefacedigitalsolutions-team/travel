'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Login.css';

export default function AdminLogin() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aapka secure passcode
    if (passcode === 'riyazu@123') {
      sessionStorage.setItem('vt_admin_auth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="vt-login-container">
      <div className="vt-login-card">
        <div className="vt-login-brand">
          VERDANT <span>TRAILS</span>
          <span className="vt-login-sub">Concierge Command Access</span>
        </div>

        <form onSubmit={handleLogin} className="vt-login-form">
          <div className="vt-input-group">
            <label htmlFor="passcode">Admin Passcode</label>
            <input
              id="passcode"
              type="password"
              placeholder="Enter secure passcode..."
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError(false);
              }}
              required
            />
          </div>

          {error && <span className="vt-error-msg">Invalid passcode. Please try again.</span>}

          <button type="submit" className="vt-login-btn">
            Authenticate & Enter →
          </button>
        </form>
      </div>
    </div>
  );
}