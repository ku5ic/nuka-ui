---
"@nuka-ui/core": patch
---

Refresh transitive development dependencies to resolve open security advisories: undici 7.28.0 (7 advisories, incl. GHSA-vmh5-mc38-953g and GHSA-hm92-r4w5-c3mj, HIGH), ws 8.21.1 (GHSA-96hv-2xvq-fx4p, HIGH), js-yaml 4.3.0 / 3.15.0 (GHSA-h67p-54hq-rp68, MODERATE), and @babel/core 7.29.7 (GHSA-4x5r-pxfx-6jf8, LOW). All are development-only dependencies resolved via a targeted lockfile refresh; no runtime code or public API is affected.
