// Sanity Studio needs full control of the page -- no site fonts, no intro
// overlay, no footer. This is a separate root layout (sibling to
// app/(site)/layout.tsx) so it never inherits the site's <html>/<body>.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
