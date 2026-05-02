# Smart News Dashboard with Personalized Filtering

A production-ready React + Vite capstone project for the Entertainment & Media domain. The app fetches live news from GNews or NewsAPI and supports category browsing, debounced search, advanced filters, infinite scrolling, localStorage bookmarks, and theme persistence.

## Features

- Home dashboard with hero, trending news, latest headlines, category tabs, and featured cards
- Category pages for technology, sports, business, health, entertainment, and science
- Debounced search with 500ms delay and instant suggestions
- Sort by newest/popularity, filter by source, and filter by category
- Infinite scrolling with the Intersection Observer API
- Bookmark CRUD: add, view, and remove saved articles in localStorage
- Dark/light mode saved in localStorage
- Error Boundary, API error messages, retry action, skeleton loaders, and empty states
- Responsive layouts for mobile, tablet, and desktop
- Code splitting and lazy-loaded routes

## Tech Stack

- React + Vite
- JavaScript ES6+
- React Router DOM
- Context API
- Tailwind CSS
- Axios
- LocalStorage

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## API Configuration

Create a `.env` file from `.env.example`.

```bash
VITE_NEWS_PROVIDER=gnews
VITE_GNEWS_API_KEY=your_gnews_api_key_here
VITE_NEWS_API_KEY=your_newsapi_key_here
```

Use `VITE_NEWS_PROVIDER=gnews` for `https://gnews.io/` or `VITE_NEWS_PROVIDER=newsapi` for `https://newsapi.org/`.

If no API key is present, the app uses local demo news so the dashboard remains fully usable for review and presentations.

## Project Structure

```text
src/
  api/          Axios client and API provider config
  assets/       Static app assets
  components/   Reusable UI components
  context/      Theme, news, and bookmark Context providers
  hooks/        Debounce, fetch news, infinite scroll, localStorage hooks
  layouts/      Shared dashboard layout
  pages/        Route-level screens
  routes/       Router and protected route setup
  services/     News service and fallback demo data
  styles/       Reserved for extra style modules
  utils/        Constants, article normalization, formatting helpers
```

## Key Files

- `src/App.jsx`: wraps the app with Error Boundary and all Context providers.
- `src/routes/AppRoutes.jsx`: defines `/`, `/categories/:type`, `/bookmarks`, and `/article/:id`.
- `src/services/newsService.js`: fetches news through Axios and normalizes provider responses.
- `src/hooks/useFetchNews.js`: handles API loading, pagination state, retry, and errors.
- `src/hooks/useInfiniteScroll.js`: observes the last article card and loads more results.
- `src/context/BookmarkContext.jsx`: implements bookmark CRUD with localStorage.
- `tailwind.config.js` and `postcss.config.js`: Tailwind CSS setup.

## Performance Optimizations

- `React.lazy` and `Suspense` split route bundles so initial load stays lighter.
- `React.memo` on `NewsCard` avoids unnecessary card re-renders.
- `useMemo` computes suggestions, sources, and request filters only when inputs change.
- `useCallback` stabilizes callbacks passed to hooks and child components.
- Skeleton loaders keep the UI responsive during network calls.
- Images use native lazy loading.

## Capstone SOP Coverage

- React-based UI: Vite React application with reusable components.
- Routing: React Router DOM with dynamic routes.
- State management: Context API for theme, news, and bookmarks.
- API integration: Axios service for GNews/NewsAPI.
- CRUD operations: bookmark create, read, and delete with localStorage persistence.
- Performance optimization: memoization, lazy loading, code splitting, skeleton loaders.
- Error handling: Error Boundary, API error handling, retry button, empty states.
- Pagination/infinite scroll: Intersection Observer loads additional pages.
- Deployment-ready structure: environment example, Vite build, README, clean folder layout.

## Deployment

### Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add environment variables from `.env.example`.
4. Use build command `npm run build`.
5. Use output directory `dist`.

### Netlify

1. Push the project to GitHub.
2. Import the repository in Netlify.
3. Add environment variables from `.env.example`.
4. Use build command `npm run build`.
5. Use publish directory `dist`.

## Screenshots

Add screenshots here after running the app:

- Dashboard
- Category page
- Bookmarks page
- Dark mode

## Future Improvements

- Add optional authentication and user profiles.
- Add bookmark update notes/tags to complete full update behavior.
- Add article sentiment analysis and simple source credibility indicators.
- Add saved filter presets.
- Add unit tests and end-to-end tests with Playwright.
