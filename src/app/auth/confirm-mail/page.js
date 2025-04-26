'use client';

import styles from './confirmMail.module.css';
import '@/app/globals.css';
import { Inter700, Inter500, Inter600 } from '@/lib/fonts/Inter';

import { useState, useEffect } from 'react';

export default function ConfirmEmailPage() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    if (canResend) {
      console.log('Email retrimis!');
      setTimeLeft(60);
      setCanResend(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title + " " + Inter700.className}>Cerere de confirmare trimisă</div>
      <div className={styles.subtitle + " " + Inter500.className}>
        Ți-am trimis un email de confirmare la adresa [adresa de email a userului].
        <br />
        Te rugăm să verifici inbox-ul (și folderul de spam) și să urmezi
        link-ul din mesaj pentru a-ți confirma contul.
      </div>

      <div className={styles.resendContainer}>
        <div className={styles.resendText}>Nu ai primit emailul?</div>
        <button
          className={styles.resendButton + " " + Inter600.className}
          onClick={handleResend}
          disabled={!canResend && timeLeft > 0}
        >
          Trimite din nou {timeLeft > 0 && `(${timeLeft}s)`}
        </button>
      </div>

      <div className={styles.backToLogin}>
        <button className={styles.backToLoginButton + " " + Inter600.className}>
          Înapoi la autentificare</button>
      </div>
    </div>
  );
}