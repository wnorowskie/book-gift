# Your Year in Books 📚

A sentimental web app to celebrate a year of reading—built as a Christmas gift.

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Add your book data:**

   - Edit `lib/data.ts` and replace the placeholder books with your real 50 books
   - Update `readerName` to the recipient's name
   - Add personal notes for each book

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Deploying to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy!

The app is static and requires no environment variables or database setup.

## Project Structure

- `app/` - Next.js App Router pages and components
- `lib/` - Data, types, and utility functions
- `public/` - Static assets (optional local book covers)

## Customization

- **Book covers**: Use external URLs or add images to `public/covers/`
- **Personal touches**: Edit the letter in `app/letter/page.tsx`
- **Styling**: All Tailwind classes can be customized
- **Reader name**: Update in `lib/data.ts`

---

Made with ❤️ for an amazing reader.
