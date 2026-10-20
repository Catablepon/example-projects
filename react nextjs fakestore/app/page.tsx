import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>Welcome to FakeStore</h2>
      <p>A modern demo shop built with Next.js and the FakeStoreAPI.</p>
      <br></br>
      <h3>What You'll Find Here</h3>
      <ul>
        <li>Browse a wide selection of demo products</li>
        <li>View detailed product information</li>
        <li>Experience fast server-side rendering with Next.js</li>
        <li>Learn how to build a real product catalog</li>
      </ul>
      <br></br>
      <h3>Get Started</h3>
      <p>Jump straight into the product list and explore items fetched directly from the FakeStore API.</p>
      <br></br>
      <a className={styles.button} href="/products">View Products</a>
    </main>
  );
}