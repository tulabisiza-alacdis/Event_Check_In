# OrgPass

Offline-first event check-in app for school organization officers. Officers can scan QR passes, search guests, register walk-ins, and see live attendance. Data is stored in a Google Sheet through Google Apps Script. The whole stack is free.

- **Live web app:** https://tulabisiza-alacdis.github.io/Event_Check_In/
- **Android app (APK):** see the [Releases](../../releases) page and download `OrgPass.apk`

## Features
- Dashboard: active event banner, Present / Registered / Remaining, check-in chart by category, recent check-ins
- Attendees: roster with role and status filters, QR Pass generator with PNG download
- Check-in: smart search (name, ticket code, last 4 characters), camera QR scanner, duplicate protection, 5-second Undo
- Announcements: add events, set the active event, delete events
- More: walk-in registration, CSV import and export, force sync, reset guest list (type `DELETE`)
- Works offline: the guest list is cached on the device and changes sync to Google Sheets when the connection returns
- Installable as a PWA and packaged as an Android APK

## Tech stack
HTML, Tailwind CSS (CDN), JavaScript, `html5-qrcode`, `qrcodejs`, Service Worker, Google Sheets + Google Apps Script, Bubblewrap (Trusted Web Activity) for the APK.

## Project structure
| Path | What it is |
|---|---|
| `index.html` | The whole app (UI and logic) |
| `manifest.json`, `sw.js`, `icon-*.png` | PWA manifest, service worker, icons |
| `code.js` | Google Apps Script backend (paste its contents into the Sheet's Apps Script editor) |
| `android/twa-manifest.json` | Bubblewrap configuration used to build the APK |
| `docs/SETUP.md` | Detailed setup guide |

## Try it quickly (no setup)
1. Open the live web app or install the APK.
2. Enter any Officer Name.
3. Tap **Demo / Offline Mode** to load 10 sample guests.

## Set up your own backend
1. Create a Google Sheet, then **Extensions > Apps Script**.
2. Delete the default code and paste the contents of `code.js`, run `setup` once, and approve permissions.
3. **Deploy > New deployment > Web app**, Execute as **Me**, access **Anyone**.
4. Copy the `/exec` URL and paste it in the app on the start screen.

More detail: [docs/SETUP.md](docs/SETUP.md)

## Install the Android app
1. Download `OrgPass.apk` from [Releases](../../releases) onto an Android phone.
2. Open it and allow **Install unknown apps** when asked.
3. If Play Protect warns, choose **Install anyway** (the app is not from the Play Store).

## Team
- Iza A. Tulabis, BSINTE 2C
- Adviser: Mr. Jann Vincent Paul C. Lagmay
