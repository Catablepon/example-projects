import styles from "./page.module.css";
import Link from 'next/link';

interface Item {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    title: string
}



export default async function ProductPage() {
    var res = await fetch('https://fakestoreapi.com/products')
    const products: Item[] = await res.json()
    //console.log(products)

    const Product = ({ item }: { item: Item}) => {
        return (
            <Link href={`/products/${item.id}`}>
                <div className={styles.itemCard}>
                    <div className={styles.topRow}>
                        <img src={item.image} width="100" height="125" className={styles.image}></img>
                    </div>

                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.price}>{item.price.toString()} €</p>
                    {/* <p className={styles.desc}>{item.description}</p>
                    <i><p className={styles.category}>{item.category}</p></i> */}
                </div>
            </Link>
        )
    }

  return (
    <main >
        <h3 style={{paddingLeft:10}}>Products</h3>
        <p style={{paddingLeft:10}}>Browse items from FakeStoreAPI</p>
        <div className={styles.items}>
            {products.map((item, index) => (
                <Product item={item} key={index}  />
            ))}
        </div>
    </main>
  );
}