# Event_Check_In

# Event Check-In

A lightweight, browser-based check-in system for managing guest arrivals at events. Built for school organization events, it lets organizers verify and check in guests quickly by name or ticket code, with all guest data stored in Google Sheets.

## Features

- Fast check-in: look up guests by name or ticket code
- Google Sheets back end: the guest list and check-in records live in a spreadsheet that organizers can already open, edit, and share
- Simple interface: clean and easy to use, even during busy events
- No server to maintain: the front end is hosted free on GitHub Pages

## Built With

- HTML5 for page structure
- CSS3 for styling and layout
- JavaScript (Vanilla) for check-in logic and interactivity
- Google Sheets as the database (back end)
- GitHub Pages for hosting

## How It Works

1. The guest list is stored in a Google Sheet.
2. The web app reads the list and looks up a guest by name or ticket code.
3. When a guest is checked in, the sheet is updated so the record is saved.

## Getting Started

1. Clone the repository:
   git clone https://github.com/tulabisiza-alacdis/Event_Check_In.git
2. Prepare your own Google Sheet with your guest list.
3. Connect the app to your sheet by updating the sheet link or API settings in script.js.
4. Open index.html in your browser.

## Project Structure

- index.html: main page
- style.css: styles
- script.js: check-in logic and Google Sheets connection

## Use Case

Designed for school organization events where organizers need a quick, reliable way to confirm attendees at the door and keep an up-to-date attendance record.

Compose
Write to Iza Alacdis Tulabis
