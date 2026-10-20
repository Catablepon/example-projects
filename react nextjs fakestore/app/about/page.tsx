import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <h2>About Page</h2>
      <p>Application: E12 - Products Next App</p>
      <p>Version: 1.0.0</p>
      <p>Author: Eemeli Virkkala</p>
      <p>Description: The purpose of this exercise is to practice the fundamentals of React development with Next.js framework.</p>
    </main>
  );
}