import { useState, useEffect } from 'react';

const FlashMessage = ({ messages, type }) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setVisible(true);
      setFadeOut(false);
      
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setVisible(false);
        }, 500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  if (!visible || !messages || messages.length === 0) {
    return null;
  }

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div
      className={`flash-message ${bgColor} text-white rounded-md px-5 py-3 ${
        fadeOut ? 'fade-out' : ''
      }`}
    >
      {messages.map((msg, index) => (
        <span key={index}>
          {msg}
          {index < messages.length - 1 && <br />}
        </span>
      ))}
    </div>
  );
};

export default FlashMessage;
