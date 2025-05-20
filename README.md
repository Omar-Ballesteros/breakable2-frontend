# Breakable Toy II - Spotify Integration Frontend

Frontend of fullstack app, built with React, Typescript, Vite, and Material UI

## Tools and libraries

- React
- Typescript
- Vite
- Axios
- Material UI
- ESLint

## Features
- Spotify authentication with authorization code flow
- Search functionality for artists, albums and tracks
- Artist and album detail pages
- Token and session management with React Context
- Client side routing rith react-router-dom
- Responsive UI with MUI

## Project Structure

```
src/
├── components/ # Reusable components
├── context/ # Global context provider (AuthContext)
├── hooks/ # Custom react hooks
├── pages/ # Main application pages (Login, Dashboard, Callback, ArtistDetails, AlbumDetails)
├── types/ # Type definitions and models
├── App.tsx # Route configuration
├── main.tsx # Application entry point
```

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Omar-Ballesteros/breakable2-frontend
cd frontend
```

2. **Install dependencies:**
   
```bash
npm install
```

3. **Start the server(important: run with host flag):**
   
```bash
npm run dev --  --host 127.0.0.1  
```

4. **Make sure the backend is running at:**

   `http://localhost:9090`

## Running Tests

## Backend Integration

This frontend communicates with a Java Spring Boot backend that handles Spotify authentication, token management and serves data consumed by the UI.
