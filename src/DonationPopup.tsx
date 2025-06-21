import React, { useState, useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const ONE_HOUR_SECONDS = 3600;

export default function DonationSnackbar(): JSX.Element | null {
  const { t } = useTranslation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showFullPopup, setShowFullPopup] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const sessionStart = useRef<number | null>(null);
  const totalTimeKey = 'totalTimeSpent';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  useEffect(() => {
    function startSession() {
      sessionStart.current = Date.now();
    }

    function endSession() {
      if (sessionStart.current !== null) {
        const now = Date.now();
        const secondsSpent = (now - sessionStart.current) / 1000;

        const prevTotal = parseFloat(localStorage.getItem(totalTimeKey) ?? '0');
        const newTotal = prevTotal + secondsSpent;

        localStorage.setItem(totalTimeKey, newTotal.toString());

        sessionStart.current = null;

        if (newTotal >= ONE_HOUR_SECONDS && !showSnackbar) {
          setShowSnackbar(true);
        }
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        startSession();
      } else {
        endSession();
      }
    }

    startSession();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', endSession);

    const storedTime = parseFloat(localStorage.getItem(totalTimeKey) ?? '0');
    if (storedTime >= ONE_HOUR_SECONDS) {
      setShowSnackbar(true);
    }

    return () => {
      endSession();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', endSession);
    };
  }, [showSnackbar]);

  if (!showSnackbar) return null;

  const wallets = [
    { name: t('donation.btc'), address: 'bc1qf2vsevgepyqpt7hyfejchz5n0ta84k5kcp79pv' },
    { name: t('donation.eth'), address: '0xf7BCED130AF19D3D085B50098e55132b734B82FC' },
    { name: t('donation.ltc'), address: 'ltc1qqc3cp6gwpe2gkqwnc9t46srx63ynhgypngfx9p' },
  ];

  return (
    <>
      {!showFullPopup && (
        <div
          className="
            fixed bottom-1 left-2 right-2
            bg-white border border-gray-300 shadow-xl rounded-md
            px-2 py-1 text-[10px] text-gray-800 z-50
            flex items-center justify-between
            sm:max-w-md sm:left-auto sm:right-auto sm:rounded-full sm:px-4 sm:py-2 sm:text-xs
          "
          style={{ maxWidth: '500px' }}
        >
          <span className="truncate text-center w-full sm:w-auto">
            {t('donation.snackbar')}
          </span>
          <div className="flex space-x-2 ml-3">
            <button
              onClick={() => setShowFullPopup(true)}
              className="text-blue-600 underline hover:text-blue-800 whitespace-nowrap text-[10px]"
            >
              {t('donation.details')}
            </button>
            {/* <button
              onClick={() => setShowSnackbar(false)}
              aria-label="Close"
              className="text-gray-400 hover:text-gray-600 font-bold text-[12px]"
            >
              ×
            </button> */}
          </div>
        </div>
      )}

      {showFullPopup && (
        <div
          className="
            fixed bottom-4 left-2 right-2
            max-w-full
            bg-white border border-gray-300 shadow-xl rounded-2xl
            p-3 text-xs text-gray-800 z-50
            sm:max-w-sm sm:right-4 sm:left-auto
          "
          style={{ maxHeight: '60vh', overflowY: 'auto' }}
        >
          <p className="mb-2 leading-tight">
            <Trans i18nKey="donation.description" />
          </p>
          <div className="mb-2 text-xs break-all space-y-3">
            {wallets.map(({ name, address }) => (
              <div key={address} className="mb-2">
                <strong className="block text-sm">{name}:</strong>
                <div className="flex items-center space-x-2">
                  <span className="select-all truncate flex-1">{address}</span>
                  <button
                    onClick={() => copyToClipboard(address)}
                    className="px-2 py-0.5 text-blue-600 hover:text-blue-800 text-xs whitespace-nowrap"
                  >
                    {copied === address ? t('donation.copied') : t('donation.copy')}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowFullPopup(false)}
            className="mt-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-xs"
          >
            {t('donation.close')}
          </button>
        </div>
      )}
    </>
  );
}
