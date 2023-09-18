import DetailImage from './DetailImage';
import DetailInfo from './DetailInfo';

import styles from "./productsPageDetailSections.module.scss";

const ProductsDetailSections = ({data} : {data:any}) => {
    return (

        <div className={styles.detail}>
            <DetailImage src={data.thumbnail} alt={data.title} />
            <DetailInfo data={data} />
        </div>
  )
}

export default ProductsDetailSections