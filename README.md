# Abanyamuryango · Members Directory

A paginated data table for a fictional Kigali cooperative, built with the DummyJSON users API (208 users).

**Team:** _Driver name_ & _Navigator name_
**Live demo:** _add deployed link_

## Create the project

1. Create the Vite React app: "`npm create vite@latest members-table -- --template react`", then go into the folder: "`cd members-table`"
2. Install the packages: "`npm install`", then "`npm i @tanstack/react-query @tanstack/react-query-devtools tailwindcss @tailwindcss/vite`"
3. Add Tailwind to `vite.config.js`:
   ```js
   import { defineConfig } from "vite"
   import react from "@vitejs/plugin-react"
   import tailwindcss from "@tailwindcss/vite"

   export default defineConfig({ plugins: [react(), tailwindcss()] })
   ```
4. Replace everything in `src/index.css` with:
   ```css
   @import "tailwindcss";
   ```
5. Copy the project files into the structure shown below, replacing `src/App.jsx`, `src/main.jsx` and `src/index.css`.
6. Start the app: "`npm run dev`"

## Build and deploy

Build the project with "`npm run build`", push it to GitHub, then deploy it (for example on Vercel or Netlify) and add the link above.

Built with React, Vite, Tailwind CSS and TanStack Query.

```
src/
  api/          client.js  users.js
  features/users/  queries.js  UsersTable.jsx  TableToolbar.jsx  TablePagination.jsx  SortableHeader.jsx
  hooks/        useDebounce.js  useTableParams.js
  components/   ErrorState.jsx  EmptyState.jsx
  App.jsx  main.jsx  index.css
```

## Requirements covered

- **Server-side pagination** with page-size selection (10 / 20 / 50), previous/next and page numbers with ellipsis
- **Server-side sorting** on name, email, age and gender, with `aria-sort`
- **Debounced search** (400 ms) with a clear button
- **Column filter** by gender (the API can't combine search and filter, so using one clears the other)
- **States:** loading skeleton, "Updating…" badge, faded rows while changing pages, empty state with Clear, error state with Retry
- **URL-synced state** (`?page=3&sortBy=age&order=desc`), so links can be shared and Back/Forward work. Any change except the page resets to page 1.
- **Next-page prefetching** and no skeleton flash between pages
- **Accessible markup:** real `<table>`, labelled inputs, keyboard support and visible focus
- **Responsive** layout, usable at 360px

## Responsive choice

I used a **horizontal scroll container with a sticky name column**. Every column stays available on phones, and the name stays on screen so each row is easy to identify.

## Screenshots

<img width="917" height="430" alt="Screenshot 2026-11-25 195333" src="https://github.com/user-attachments/assets/5cfd69fc-0fde-4caa-b66e-9228f7360b87" />

<img width="428" height="380" alt="Screenshot 2026-11-25 194445" src="https://github.com/user-attachments/assets/22e4c7be-e77d-40ab-87a1-377dc906adbc" />
<img width="335" height="418" alt="Screenshot 2026-11-25 194612" src="https://github.com/user-attachments/assets/9cdcd09b-d17b-4b90-af65-7dd32db58ce9" />
<img width="549" height="383" alt="Screenshot 2026-11-25 194638" src="https://github.com/user-attachments/assets/01615230-72b6-4ad8-a85e-5667cad0d3c1" />

<img width="923" height="418" alt="image" src="https://github.com/user-attachments/assets/a30a9d7e-ef10-4c59-8579-90a8d5fc4f5a" />



