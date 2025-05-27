# Product Primer

This is Product Primer - A Starter Guide to Building Great* Products (*great is not always successful)

## Next.js Website

This project has been converted from a static HTML website to a modern Next.js application with TypeScript and Tailwind CSS.

### Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

To build the application for production:

```bash
npm run build
npm start
```

### Project Structure

- `src/app/` - Next.js App Router pages
  - `page.tsx` - Home page (Introduction)
  - `why/page.tsx` - Why chapter
  - `how/page.tsx` - How chapter
  - `what/page.tsx` - What chapter
  - `summary/page.tsx` - Summary chapter
- `src/components/` - Reusable React components
  - `Navigation.tsx` - Mobile-responsive navigation menu
  - `PageLayout.tsx` - Common layout wrapper
- `public/` - Static assets (images)
- `src/app/globals.css` - Global styles

### Features

- 📱 Mobile-responsive design
- 🎨 Custom typography with Google Fonts (Shippori Mincho & Inter)
- 🧭 Slide-out navigation menu
- ⚡ Optimized images with Next.js Image component
- 📊 Google Analytics integration
- 🚀 Fast page navigation with Next.js routing

### Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
