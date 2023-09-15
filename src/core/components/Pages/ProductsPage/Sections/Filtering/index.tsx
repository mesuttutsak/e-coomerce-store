import Dropdown from "../../../../Dropdown";
import Section from "../../../../Section";
import styles from "../productsPageSections.module.scss";

const Filtering = () => {
  return (
    <Section className={[styles.productsFiltering]}>
      <Dropdown title="Deneme">asd</Dropdown>
      <Dropdown title="Deneme123">asd</Dropdown>
    </Section>
  )
}

export default Filtering;