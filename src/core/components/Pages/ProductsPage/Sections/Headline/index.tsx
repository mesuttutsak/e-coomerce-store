import styles from "../productsPageSections.module.scss";
import Text from "../../../../Text";
import { useDispatch, useSelector } from "react-redux";
import DebounceInput from "../../../../FormElements/DebounceInput";

const Headline = () => {
  const dispatch = useDispatch();

  const { products, productsLoading, filteredProducts, searchText } = useSelector((state: any) => state);

  return (
    <div className={styles.productsBodyHeadline}>
      <span>
        {!productsLoading ? <>
        {products.length > 0 && searchText === "" ? <>
        <Text fontSize="md" fontWeight="semibold">{filteredProducts?.length}</Text>&nbsp;<Text>filtered out of</Text>&nbsp;<Text fontSize="md" fontWeight="semibold">{products.length}</Text>&nbsp;<Text fontSize="sm">results are listed.</Text>
        </> :
          products.length > 0 ? <>
           <Text fontSize="md" fontWeight="semibold">{filteredProducts?.length}</Text>&nbsp;<Text>filtered out of</Text>&nbsp;<Text fontSize="md" fontWeight="semibold">{products.length}</Text>&nbsp;<Text fontSize="sm"> results are listed for the search "{searchText}"</Text>

          </> :
            <Text>Not found for search "{searchText}".</Text>
        }</> : '...'}
      </span>

      <DebounceInput id='search' placeholder="Search in products details..." value={searchText} onInputValue={(value: string) => dispatch({ type: "setSearchText", payload: value })} setLoading={() => null} />
    </div>
  )
}

export default Headline;