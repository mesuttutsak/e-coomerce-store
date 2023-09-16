import { useSelector } from "react-redux";
import Dropdown from "../../../../Dropdown";
import Section from "../../../../Section";
import styles from "../productsPageSections.module.scss";

const Filtering = () => {
  const {categories} = useSelector((state:any) => state);

  return (
    <Section className={[styles.productsFiltering]}>
      <Dropdown title="Category">
      {categories.map((category:string) => <>{category}<br/></>)}
      </Dropdown>
      {/* <Dropdown >asd</Dropdown> */}
    </Section>
  )
}

export default Filtering;