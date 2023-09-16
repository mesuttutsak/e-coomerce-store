import { useSelector } from "react-redux";
import styles from "../productsPageSections.module.scss";
import Text from "../../../../Text";

const Headline = () => {
  const {productLength} = useSelector((state:any) => state);
  return (
    <div className={styles.productsBodyHeadline}><Text fontWeight="semibold">{productLength}</Text>&nbsp;results listed</div>
  )
}

export default Headline;