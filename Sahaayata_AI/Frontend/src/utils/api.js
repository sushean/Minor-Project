// Mock API helper functions for frontend development.
// These functions simulate network calls and will be replaced by real FastAPI endpoints.

const STORAGE_KEY = 'sahaayata_mock_reports_v1';

function loadReports() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveReports(reports) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export async function apiLogin({ email, password, role }) {
  // Placeholder for Firebase Authentication.
  // TODO: replace with Firebase auth integration.
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo: accept any credentials; return role and a fake token
      resolve({ success: true, role, token: 'fake-jwt-token' });
    }, 700);
  });
}

export async function apiSubmitReport(report) {
  // POST /api/report placeholder
  return new Promise((resolve) => {
    setTimeout(() => {
      const reports = loadReports();
      const saved = { id: Date.now(), verified: false, timestamp: new Date().toISOString(), ...report };
      reports.unshift(saved);
      saveReports(reports);
      // Here, the transformer/AI verification would be invoked (commented for backend integration)
      // e.g. send the image/description to a BERT-based verifier and mark verified when done.
      resolve({ success: true, report: saved });
    }, 900);
  });
}

export async function apiGetReports({ onlyVerified = true } = {}) {
  // GET /api/reports placeholder
  return new Promise((resolve) => {
    setTimeout(() => {
      const reports = loadReports();
      const filtered = onlyVerified ? reports.filter((r) => r.verified) : reports;
      resolve({ success: true, reports: filtered });
    }, 700);
  });
}

// Utility to mark a report as verified for admin demo usage
export async function apiVerifyReport(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reports = loadReports();
      const idx = reports.findIndex((r) => r.id === id);
      if (idx !== -1) {
        reports[idx].verified = true;
        saveReports(reports);
        resolve({ success: true, report: reports[idx] });
      } else resolve({ success: false });
    }, 500);
  });
}

// Seed some demo verified reports (only when empty)
export function seedDemoReports() {
  const existing = loadReports();
  if (existing.length === 0) {
    const demo = [
      { id: 1, type: 'Flood', description: 'River overflow near bridge', lat: 37.7749, lng: -122.4194, severity: 'high', timestamp: new Date().toISOString(), verified: true },
      { id: 2, type: 'Fire', description: 'Wildfire spotted near hills', lat: 34.0522, lng: -118.2437, severity: 'critical', timestamp: new Date().toISOString(), verified: true },
      { id: 3, type: 'Landslide', description: 'Landslide blocking road', lat: 28.7041, lng: 77.1025, severity: 'medium', timestamp: new Date().toISOString(), verified: true }
    ];
    saveReports(demo);
  }
}

export default { apiLogin, apiSubmitReport, apiGetReports, apiVerifyReport, seedDemoReports };
