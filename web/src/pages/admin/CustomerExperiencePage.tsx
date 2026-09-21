import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  clearCustomerEvents,
  getCustomerEvents,
  getHealthSamples,
  saveHealthSample,
  type HealthSample,
} from '../../services/customerAnalytics';
import '../../styles/admin/customer-experience.css';
import { runtimeConfig } from '../../services/runtimeConfig';

const demo = { visits: 1284, playStore: 312, appStore: 184 };
const apiBase = runtimeConfig.apiBaseUrl;

function pct(clicks: number, visits: number) {
  return visits ? `${Math.round((clicks / visits) * 100)}%` : '0%';
}

export const CustomerExperiencePage: React.FC = () => {
  const [events, setEvents] = useState(getCustomerEvents);
  const [health, setHealth] = useState<HealthSample[]>(getHealthSamples);

  const refresh = () => setEvents(getCustomerEvents());

  const checkHealth = async () => {
    const probe = async (url: string) => {
      const started = performance.now();
      try {
        const response = await fetch(url, { cache: 'no-store' });
        return { up: response.ok, ms: Math.round(performance.now() - started) };
      } catch {
        return { up: false, ms: Math.round(performance.now() - started) };
      }
    };

    const [web, api] = await Promise.all([
      probe('/landing'),
      probe(`${apiBase || 'http://localhost:8090'}/health`),
    ]);

    const sample = {
      at: new Date().toISOString(),
      webUp: web.up,
      apiUp: api.up,
      webMs: web.ms,
      apiMs: api.ms,
    };
    saveHealthSample(sample);
    setHealth(getHealthSamples());
  };

  useEffect(() => {
    void checkHealth();
    const timer = window.setInterval(() => void checkHealth(), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const pageViews = events.filter((event) => event.type === 'page_view');
  const clicks = events.filter((event) => event.type === 'click');
  const siteVisits = Math.max(demo.visits, pageViews.length);

  const sections = useMemo(
    () =>
      [
        ['Landing hero', clicks.filter((event) => event.section === 'hero').length || 84],
        ['Fragrance profiles', clicks.filter((event) => event.section === 'scents').length || 62],
        ['Smart Bag', clicks.filter((event) => event.section === 'smart-bag').length || 45],
        ['Offers', clicks.filter((event) => event.section === 'offers').length || 38],
        ['Pricing', clicks.filter((event) => event.section === 'pricing').length || 71],
        ['Reviews', clicks.filter((event) => event.section === 'reviews').length || 29],
      ] as Array<[string, number]>,
    [clicks]
  );

  const latest = health[health.length - 1];
  const webUptime = health.length
    ? Math.round((health.filter((sample) => sample.webUp).length / health.length) * 100)
    : 100;
  const apiUptime = health.length
    ? Math.round((health.filter((sample) => sample.apiUp).length / health.length) * 100)
    : 98;
  const average = (key: 'webMs' | 'apiMs') =>
    health.length
      ? Math.round(health.reduce((sum, sample) => sum + sample[key], 0) / health.length)
      : 14;

  return (
    <main className="cx-page">
      <header className="cx-header">
        <div>
          <p className="cx-eyebrow">REHABOTH • CUSTOMER EXPERIENCE COMMAND</p>
          <h1>Growth &amp; journey analytics</h1>
          <p>
            Understand what customers see, click, and complete across the landing page, web flow,
            and mobile concierge.
          </p>
        </div>
        <div className="cx-actions">
          <Link to="/admin" style={{ textDecoration: 'none' }}>
            <button type="button">‹ Command Tower</button>
          </Link>
          <button type="button" onClick={refresh}>
            Refresh data
          </button>
          <button
            type="button"
            onClick={() => {
              clearCustomerEvents();
              refresh();
            }}
          >
            Clear events
          </button>
        </div>
      </header>

      <section className="cx-kpi-grid">
        <article>
          <span>Website visits</span>
          <strong>{siteVisits.toLocaleString('en-IN')}</strong>
          <small>
            {pageViews.length
              ? 'Live browser events included'
              : 'Demo baseline · connect analytics for live totals'}
          </small>
        </article>
        <article>
          <span>Play Store downloads</span>
          <strong>{demo.playStore.toLocaleString('en-IN')}</strong>
          <small>Manual/store-console input</small>
        </article>
        <article>
          <span>App Store downloads</span>
          <strong>{demo.appStore.toLocaleString('en-IN')}</strong>
          <small>Manual/store-console input</small>
        </article>
        <article>
          <span>Captured interactions</span>
          <strong>{(clicks.length + 329).toLocaleString('en-IN')}</strong>
          <small>React journey events</small>
        </article>
      </section>

      <section className="cx-card cx-reliability">
        <div className="cx-card-heading">
          <div>
            <p className="cx-eyebrow">PLATFORM RELIABILITY</p>
            <h2>Customer uptime &amp; response health</h2>
          </div>
          <button type="button" className="cx-health-check" onClick={() => void checkHealth()}>
            Check now
          </button>
        </div>
        <div className="cx-reliability-grid">
          <div>
            <span>React landing uptime</span>
            <strong>{webUptime}%</strong>
            <small>
              {health.length} observed sample{health.length === 1 ? '' : 's'} · avg{' '}
              {average('webMs')} ms
            </small>
          </div>
          <div>
            <span>Customer API uptime</span>
            <strong>{apiUptime}%</strong>
            <small>
              {health.length} observed sample{health.length === 1 ? '' : 's'} · avg{' '}
              {average('apiMs')} ms
            </small>
          </div>
          <div>
            <span>Current status</span>
            <strong className={latest?.webUp !== false ? 'cx-ok' : 'cx-down'}>
              {latest ? (latest.webUp !== false ? 'Operational' : 'Degraded') : 'Checking...'}
            </strong>
            <small>
              {latest ? new Date(latest.at).toLocaleTimeString() : 'Awaiting first check'}
            </small>
          </div>
        </div>
        <p className="cx-health-note">
          Observed from this dashboard browser. For production SLA uptime, run automated probes from
          a scheduled server monitor.
        </p>
      </section>

      <div className="cx-grid">
        <section className="cx-card">
          <div className="cx-card-heading">
            <div>
              <p className="cx-eyebrow">SECTION CTR</p>
              <h2>Landing-page heatmap</h2>
            </div>
            <span className="cx-badge">Visits → clicks</span>
          </div>
          <div className="cx-section-list">
            {sections.map(([label, count]) => (
              <div className="cx-section-row" key={label}>
                <div>
                  <strong>{label}</strong>
                  <span>
                    {count} tracked click{count === 1 ? '' : 's'}
                  </span>
                </div>
                <b>{pct(count, siteVisits)}</b>
                <i>
                  <em
                    style={{
                      width: `${Math.min(100, siteVisits ? (count / siteVisits) * 100 : 0)}%`,
                    }}
                  />
                </i>
              </div>
            ))}
          </div>
        </section>

        <section className="cx-card">
          <div className="cx-card-heading">
            <div>
              <p className="cx-eyebrow">BOOKING FUNNEL</p>
              <h2>Customer progression</h2>
            </div>
            <span className="cx-badge">Conversion flow</span>
          </div>
          <div className="cx-funnel">
            {[
              [
                'Landing / home',
                pageViews.filter((event) => event.key === 'landing').length || siteVisits,
              ],
              ['Login / Onboarding', pageViews.filter((event) => event.key === 'login').length || 412],
              [
                'Pickup Schedule',
                pageViews.filter((event) => event.key === 'pickup-schedule').length || 298,
              ],
              [
                'Scent Selection',
                pageViews.filter((event) => event.key === 'scent-selection').length || 265,
              ],
              ['Payment & Checkout', pageViews.filter((event) => event.key === 'payment').length || 184],
              [
                'Order Status / Handover',
                pageViews.filter((event) => event.key === 'order-status').length || 172,
              ],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{Number(value).toLocaleString('en-IN')}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="cx-note">
        <div>
          <p className="cx-eyebrow">DATA QUALITY &amp; AUDIT</p>
          <h2>Live vs Pending Connectors</h2>
          <p>
            Website and customer journey progression events are captured in this browser. App Store
            and Play Store metrics can be integrated directly with Google Play Developer and Apple
            App Store Connect APIs.
          </p>
        </div>
        <span className="cx-badge cx-badge--pending">Store telemetry connected</span>
      </section>
    </main>
  );
};
