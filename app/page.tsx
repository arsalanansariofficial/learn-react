import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <header>
        <h1>React</h1>
      </header>
      <section>
        <h2>Hooks</h2>
        <ol>
          <li>
            <Link href='/useOptimistic'>useOptimistic</Link>
          </li>
        </ol>
      </section>
    </main>
  );
}
