export type CustomerEvent = {
  type: 'page_view' | 'click';
  key: string;
  section?: string;
  at: string;
};

export type HealthSample = {
  at: string;
  webUp: boolean;
  apiUp: boolean;
  webMs: number;
  apiMs: number;
};

const storageKey = 'rehaboth-customer-analytics';
const healthStorageKey = 'rehaboth-platform-health';

function readEvents(): CustomerEvent[] {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as CustomerEvent[]) : [];
  } catch {
    return [];
  }
}

export function trackCustomerEvent(event: Omit<CustomerEvent, 'at'>) {
  const events = [...readEvents(), { ...event, at: new Date().toISOString() }].slice(-5000);
  localStorage.setItem(storageKey, JSON.stringify(events));
}

export function getCustomerEvents() {
  return readEvents();
}

export function clearCustomerEvents() {
  localStorage.removeItem(storageKey);
}

export function getHealthSamples(): HealthSample[] {
  try {
    return JSON.parse(localStorage.getItem(healthStorageKey) ?? '[]') as HealthSample[];
  } catch {
    return [];
  }
}

export function saveHealthSample(sample: HealthSample) {
  localStorage.setItem(
    healthStorageKey,
    JSON.stringify([...getHealthSamples(), sample].slice(-1000))
  );
}
