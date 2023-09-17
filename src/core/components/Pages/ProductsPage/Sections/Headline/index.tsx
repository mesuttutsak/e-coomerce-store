import { useSelector } from "react-redux";
import styles from "../productsPageSections.module.scss";
import Text from "../../../../Text";
import { useDispatch } from "react-redux";
import DebounceInput from "../../../../FormElements/DebounceInput";

const Headline = () => {
  const dispatch = useDispatch();

  const { products, searchText } = useSelector((state: any) => state);
  return (
    <div className={styles.productsBodyHeadline}>
      <span>
        {products.length > 0 && searchText === "" ? <>
          <Text fontSize="md" fontWeight="semibold">{products.length}</Text>&nbsp;<Text fontSize="sm">results are listed.</Text>
        </> :
          products.length > 0 ? <>
            <Text fontSize="md" fontWeight="semibold">{products.length}</Text>&nbsp;<Text fontSize="sm"> results are listed for the search "{searchText}"</Text>
          </> :
            <Text>no results found</Text>
        }
      </span>

      <DebounceInput id='search' value={searchText} onInputValue={(value: string) => dispatch({ type: "setSearchText", payload: value })} setLoading={() => null} />
    </div>
  )
}

export default Headline;