import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>FakeStore</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
      </nav>
    </header>
  );
}