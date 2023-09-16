import { useSelector } from "react-redux";
import styles from "../productsPageSections.module.scss";
import Text from "../../../../Text";
import { useDispatch } from "react-redux";
import DebounceInput from "../../../../FormElements/DebounceInput";

const Headline = () => {
  const dispatch = useDispatch();

  const { filteredProducts, searchText } = useSelector((state: any) => state);
  return (
    <div className={styles.productsBodyHeadline}>
      {filteredProducts.length > 0 ?
        <><Text fontSize="md" fontWeight="semibold">{filteredProducts.length}</Text><Text fontSize="sm">results listed</Text></> :
        <Text>no results found</Text>
      }

      <DebounceInput id='search' value={searchText} onInputValue={(value:string) => dispatch({ type: "setSearchText", payload: value })} setLoading={() => null}/>
    </div>
  )
}

export default Headline;