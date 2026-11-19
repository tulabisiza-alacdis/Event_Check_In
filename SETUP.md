# OrgPass Setup Guide (100% free)

Files in your project folder: `index.html`, `manifest.json`, `sw.js` (and `Code.gs`, which is pasted into Google, not hosted).

## 1. Test locally in VS Code
1. Put `index.html`, `manifest.json`, `sw.js` in one folder and open it in VS Code.
2. Install the **Live Server** extension (Ritwick Dey).
3. Right-click `index.html` → **Open with Live Server**.
4. On the start screen tap **Demo / Offline Mode** to try everything with 10 sample guests.
   - Camera scanning needs HTTPS or `localhost`. Live Server uses `localhost`, so it works.

## 2. Create the Google Sheet backend
1. Create a new Google Sheet (name it e.g. "OrgPass Guests").
2. **Extensions → Apps Script**. Delete the default code and paste all of `Code.gs`. Save.
3. Select the `setup` function and click **Run**. Approve the permissions (this auto-creates the `Guests` and `Events` tabs).
4. **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy** and copy the **Web app URL** (ends in `/exec`).
6. If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the same URL keeps working.

## 3. Connect the app
1. Open the app, enter your **Officer Name**, paste the **/exec URL**, tap **Connect & Start**.
2. The URL is saved on the device, so each officer pastes it once.
3. Add guests: type them in the `Guests` tab (Name, TicketCode, Role), or use **More → Import CSV**.
4. Role must be one of: Student, Speaker, Officer, Staff, Guest.

## 4. Host for free
**Netlify Drop**
1. Go to https://app.netlify.com/drop and drag the folder (with the 3 files) onto the page.
2. Open the generated `https://….netlify.app` link on each officer's phone.

**GitHub Pages**
1. Create a public repo, upload the 3 files to the root.
2. **Settings → Pages → Deploy from branch → main / (root)**.
3. Open `https://<username>.github.io/<repo>/`.

## 5. Install on phones
- **Android (Chrome):** menu → **Install app** / **Add to Home screen**.
- **iPhone (Safari):** Share → **Add to Home Screen**.
- Open the app once while online so the service worker caches everything; after that it loads with zero internet.

## How offline mode works
- The full guest list and events are cached on the device.
- Check-ins, walk-ins, imports, and event changes are queued and sent automatically when the pill turns from amber back to green (auto-sync every 10 s, or **More → Force Sync Now**).
- If two officers check in the same guest, the first check-in on the Sheet wins.

## Troubleshooting
- **"Bad response" on connect:** redeploy with access set to **Anyone**, and use the `/exec` URL (not `/dev`).
- **Camera won't open:** allow camera permission and make sure the page is on HTTPS (or localhost).
- **Changed the app files after deploying?** Bump `CACHE` in `sw.js` (e.g. `orgpass-v2`) so phones fetch the new version.
- Google free-tier quotas are generous for school events, but avoid leaving many devices open all day; background sync pauses when the app is hidden.
