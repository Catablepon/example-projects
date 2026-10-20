import styles from "./page.module.css";

interface Item {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    title: string
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const product: Item = await res.json()

  return (
            <main className={styles.itemdesc}>
              <img src={product.image} width="200" height="300" className={styles.image}></img>
              <div className={styles.text}>
                <h3 className={styles.title}>{product.title}</h3>
                <i><p className={styles.category}>{product.category}</p></i>
                <p className={styles.desc}>{product.description}</p>
                <p className={styles.price}>{product.price.toString()} €</p>
              </div>
              <a className={styles.backbutton} href="/products">← Back to Products</a>
            </main>

  );
}