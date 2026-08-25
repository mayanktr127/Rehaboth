import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { WebsiteFooter } from '../components/WebsiteFooter';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const ConciergeBotPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Welcome to Rehaboth Concierge. How may I assist your wardrobe care today?',
      time: '10:14 AM',
    },
    {
      id: '2',
      sender: 'user',
      text: 'I have a question about my active order #ST-9482.',
      time: '10:15 AM',
    },
    {
      id: '3',
      sender: 'bot',
      text: 'Your order is currently at Carlyle Studio under French Lavender Steam finishing. Expected doorstep is 6:30 PM today.',
      time: '10:15 AM',
    },
  ]);

  const quickPills = [
    'Change pickup time',
    'Special fabric care',
    'Custodian location',
    'Receipt copy',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'Thank you for reaching out. A Studio Custodian specialist is reviewing your request.',
        time: 'Just now',
      };
      setMessages((prev) => [...prev, botReply]);
    }, 700);
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopHeaderNav />

      <PageTransition className="main-content" style={{ flex: 1 }}>
        <section style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
            DIGITAL CONCIERGE
          </span>
          <h1 className="font-serif" style={{ fontSize: '28px', letterSpacing: '-0.3px', marginTop: '2px' }}>
            Concierge Live
          </h1>
        </section>

        {/* Message Stream */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '82%',
                  padding: '14px 18px',
                  borderRadius: m.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  backgroundColor: m.sender === 'user' ? 'var(--color-primary)' : 'var(--bg-card)',
                  color: m.sender === 'user' ? '#ffffff' : 'var(--color-foreground)',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  fontSize: '14px',
                  lineHeight: 1.45,
                }}
              >
                {m.text}
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-muted-foreground)', marginTop: '4px', padding: '0 4px' }}>
                {m.time}
              </span>
            </div>
          ))}
        </section>

        {/* Quick Suggestion Pills */}
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {quickPills.map((pill) => (
            <button
              key={pill}
              onClick={() => handleSend(pill)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--color-border)',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-primary)',
              }}
            >
              {pill}
            </button>
          ))}
        </section>

        {/* Bottom Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message to valet..."
            style={{
              flex: 1,
              padding: '14px 18px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--color-border)',
              fontSize: '14px',
              color: 'var(--color-foreground)',
            }}
          />
          <button
            type="submit"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            ➤
          </button>
        </form>
      </PageTransition>

      <WebsiteFooter />
      <FloatingDockNav />
    </div>
  );
};

