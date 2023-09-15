
import Section from '../../../Section';
import Filtering from './Filtering';
import Headline from './Headline';
import ProductList from './ProductList';

import styles from "./productsPageSections.module.scss";

const ProductsSections = () => {
  return (
    <div className={styles.products}>
      <Filtering />
      <Section className={[styles.productsBody]}>
        <Headline />
        <ProductList />
      </Section>
    </div>
  )
}

export default ProductsSections;