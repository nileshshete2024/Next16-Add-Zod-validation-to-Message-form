export default function ContactLayout({ children }) {
  return (
    <div className="flex flex-col bg-gray-50 dark:bg-slate-900">
      {/* Section-specific header */}
      <header className="bg-blue-100 dark:bg-blue-900 p-4 text-center font-semibold shadow">
        <h2>Contact Us Section</h2>
      </header>

      {/* Page content */}
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
