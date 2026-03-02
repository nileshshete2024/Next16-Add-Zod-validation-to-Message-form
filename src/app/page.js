import Counter from "./Counter";

export default function Home() {
  return (
    <div>
      <h1>Next.js is fun!</h1>
      <Counter /> {/* Client Component inside Server Component */}
    </div>
  );
}