import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/admin/termbase.css';
import { runtimeConfig } from '../../services/runtimeConfig';

export interface TermbaseItem {
  key: string;
  source_text: string;
  context?: string;
  translations?: Record<string, string>;
}

const DEFAULT_TERMS: TermbaseItem[] = [
  {
    key: 'welcome_title',
    source_text: 'Welcome to Rehaboth',
    context: 'Customer splash & onboarding',
    translations: {
      hi: 'Rehaboth में आपका स्वागत है',
      ta: 'Rehaboth-க்கு வரவேற்கிறோம்',
      te: 'Rehaboth కు స్వాగతం',
    },
  },
  {
    key: 'get_started',
    source_text: 'GET STARTED',
    context: 'Primary onboarding call-to-action',
    translations: {
      hi: 'शुरू करें',
      ta: 'தொடங்குங்கள்',
      te: 'ప్రారంభించండి',
    },
  },
  {
    key: 'schedule_pickup',
    source_text: 'Schedule Pickup',
    context: 'Dashboard valet booking button',
    translations: {
      hi: 'पिकअप शेड्यूल करें',
      ta: 'பிக்-அப்பை திட்டமிடுங்கள்',
      te: 'పికప్ షెడ్యూల్ చేయండి',
    },
  },
  {
    key: 'signature_scents',
    source_text: 'Signature Aromas',
    context: 'Fragrance infusion carousel header',
    translations: {
      hi: 'सिग्नेचर सुगंध',
      ta: 'தனித்துவமான நறுமணங்கள்',
      te: 'సిగ్నేచర్ సువాసనలు',
    },
  },
  {
    key: 'hold_damaged_items',
    source_text: 'Hold Damaged Items & Confirm Before Processing',
    context: 'Damage intake protocol toggle in pickup flow',
    translations: {
      hi: 'क्षतिग्रस्त वस्तुओं को रोकें और पुष्टि करें',
      ta: 'சேதமடைந்த பொருட்களை நிறுத்தி உறுதிப்படுத்தவும்',
      te: 'దెబ్బతిన్న వస్తువులను ఆపి నిర్ధారించండి',
    },
  },
  {
    key: 'smart_bag_chain',
    source_text: 'Smart Bag Chain of Custody',
    context: 'RFID tamper-evident transit security',
    translations: {
      hi: 'स्मार्ट बैग सुरक्षित हैंडओवर',
      ta: 'ஸ்மார்ட் பேக் பாதுகாப்பு நெறிமுறை',
      te: 'స్మార్ట్ బ్యాగ్ భద్రతా పద్ధతి',
    },
  },
];

const consoleBase = runtimeConfig.apiBaseUrl || 'http://127.0.0.1:8090';

export const TermbasePage: React.FC = () => {
  const [terms, setTerms] = useState<TermbaseItem[]>(DEFAULT_TERMS);
  const [version, setVersion] = useState<number | null>(14);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState(`${DEFAULT_TERMS.length} phrases active in termbase`);
  const [newTerm, setNewTerm] = useState({ key: '', sourceText: '', context: '' });

  const load = async () => {
    try {
      const response = await fetch(`${consoleBase}/api/termbase/terms`);
      if (response.ok) {
        const data = await response.json();
        const loadedTerms = Array.isArray(data) ? data : data?.terms ?? [];
        if (loadedTerms.length > 0) {
          setTerms(loadedTerms);
          setVersion(data?.version ?? 15);
          setMessage(`${loadedTerms.length} phrases loaded from backend`);
          return;
        }
      }
    } catch {
      // Fallback to local catalog
    }
    setMessage(`${terms.length} phrases loaded (local termbase catalog)`);
  };

  useEffect(() => {
    void load();
  }, []);

  const filteredTerms = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return terms;
    return terms.filter((term) =>
      `${term.key} ${term.source_text} ${term.context || ''}`.toLowerCase().includes(normalized)
    );
  }, [query, terms]);

  const addTerm = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTerm.key.trim() || !newTerm.sourceText.trim()) return;

    const created: TermbaseItem = {
      key: newTerm.key.trim().toLowerCase().replace(/\s+/g, '_'),
      source_text: newTerm.sourceText.trim(),
      context: newTerm.context.trim() || 'General UI string',
      translations: {},
    };

    try {
      await fetch(`${consoleBase}/api/termbase/terms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(created),
      });
    } catch {
      // Keep local state responsive
    }

    setTerms((prev) => [created, ...prev]);
    setNewTerm({ key: '', sourceText: '', context: '' });
    setMessage(`Phrase '${created.key}' saved.`);
  };

  const removeTerm = async (key: string) => {
    if (!window.confirm(`Remove term '${key}' from Termbase?`)) return;

    try {
      await fetch(`${consoleBase}/api/termbase/terms/${encodeURIComponent(key)}`, {
        method: 'DELETE',
      });
    } catch {
      // Keep local state responsive
    }

    setTerms((prev) => prev.filter((t) => t.key !== key));
    setMessage(`Phrase '${key}' removed.`);
  };

  const updateTranslation = (key: string, lang: string, val: string) => {
    setTerms((prev) =>
      prev.map((t) => {
        if (t.key === key) {
          return {
            ...t,
            translations: {
              ...(t.translations || {}),
              [lang]: val,
            },
          };
        }
        return t;
      })
    );
  };

  return (
    <main className="termbase-page">
      <header className="termbase-header">
        <div>
          <p className="termbase-kicker">REHABOTH • SUPER ADMIN</p>
          <h1>Termbase Console</h1>
          <p>
            Manage authoritative brand terminology and translations shared across web and mobile
            clients.
          </p>
        </div>
        <div className="termbase-meta">
          <span>VERSION {version ?? '—'}</span>
          <span>{message}</span>
          <Link to="/admin" style={{ color: '#e8c36a', textDecoration: 'none', marginTop: 4 }}>
            ‹ Return to Command Tower
          </Link>
        </div>
      </header>

      <section className="termbase-toolbar" aria-label="Termbase controls">
        <input
          aria-label="Search phrases"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by key, source text, or context..."
        />
        <button
          type="button"
          onClick={() => {
            void load();
          }}
        >
          REFRESH
        </button>
      </section>

      <form className="termbase-add" onSubmit={addTerm}>
        <h2>ADD BRAND TERM</h2>
        <input
          placeholder="key_name (e.g. hero_heading)"
          value={newTerm.key}
          onChange={(e) => setNewTerm({ ...newTerm, key: e.target.value })}
          required
        />
        <input
          placeholder="English source text"
          value={newTerm.sourceText}
          onChange={(e) => setNewTerm({ ...newTerm, sourceText: e.target.value })}
          required
        />
        <input
          placeholder="UI Context / Screen location"
          value={newTerm.context}
          onChange={(e) => setNewTerm({ ...newTerm, context: e.target.value })}
        />
        <button type="submit">SAVE PHRASE</button>
      </form>

      {filteredTerms.length === 0 ? (
        <div className="termbase-empty">No phrases matching "{query}".</div>
      ) : (
        filteredTerms.map((term) => (
          <article className="termbase-card" key={term.key}>
            <div className="termbase-card-heading">
              <div>
                <span className="termbase-key">KEY: {term.key}</span>
                <p>
                  Context:{' '}
                  <strong style={{ color: '#f7f4ef' }}>{term.context || 'General Atelier'}</strong>
                </p>
              </div>
              <button
                type="button"
                className="danger-button"
                onClick={() => void removeTerm(term.key)}
              >
                DELETE
              </button>
            </div>

            <div className="termbase-source-form">
              <label>
                ENGLISH SOURCE
                <input
                  value={term.source_text}
                  onChange={(e) => {
                    const nextVal = e.target.value;
                    setTerms((prev) =>
                      prev.map((t) => (t.key === term.key ? { ...t, source_text: nextVal } : t))
                    );
                  }}
                />
              </label>
            </div>

            <div className="termbase-translations">
              {(['hi', 'ta', 'te'] as const).map((lang) => {
                const label = lang === 'hi' ? 'HI (हिन्दी)' : lang === 'ta' ? 'TA (தமிழ்)' : 'TE (తెలుగు)';
                return (
                  <div className="termbase-translation" key={lang}>
                    <span className="locale-label">{lang.toUpperCase()}</span>
                    <input
                      placeholder={`${label} translation`}
                      value={term.translations?.[lang] || ''}
                      onChange={(e) => updateTranslation(term.key, lang, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          </article>
        ))
      )}
    </main>
  );
};
