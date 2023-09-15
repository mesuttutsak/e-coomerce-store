
import Filtering from './Filtering';
import Headline from './Headline';
import ProductList from './ProductList';

import styles from "./productsPageSections.module.scss";

const ProductsSections = () => {
  return (
    <div className={styles.products}>
      <Filtering />
      <section className={styles.productsBody}>
        <Headline />
        <ProductList />
      </section>
    </div>
  )
}

export default ProductsSections;