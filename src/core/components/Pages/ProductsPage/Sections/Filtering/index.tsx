import Dropdown from "../../../../Dropdown";
import styles from "../productsPageSections.module.scss";

const Filtering = () => {
  return (
    <section className={styles.productsFiltering}>
      <Dropdown />
    </section>
  )
}

export default Filtering;