import { useSelector } from "react-redux";
import Dropdown from "../../../../Dropdown";
import Section from "../../../../Section";
import styles from "../productsPageSections.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const updateFilterQuery = (changeParams: { key: string, value: string | number }, setState: any) => {
  const { key, value } = changeParams;
  const isPathKey = key?.includes('_');

  setState((prevState: any) => {
    const updatedPrevState = { ...prevState };
    if (isPathKey) {

      const keys = key.split('_');
      let objToUpdate = updatedPrevState;

      for (let i = 0; i < keys.length - 1; i++) {
        const currentKey = keys[i];
        if (objToUpdate[currentKey] && typeof objToUpdate[currentKey] === 'object') {
          objToUpdate = objToUpdate[currentKey];
        }
      }

      const lastKey = keys[keys.length - 1];
      objToUpdate[lastKey] = value;
    } else {
      updatedPrevState[key] = updatedPrevState[key].includes(value) ? updatedPrevState[key].filter((param: string) => param !== value) : [...updatedPrevState[key], value];
    }
    return updatedPrevState;
  });
}


const findProductsLength = (arr: [], key:string, value:string) => {
  return arr?.filter((item:any) => item[key].includes(value)).length;
}

const Filtering = () => {
  const dispatch = useDispatch();

  const { filterOptions, products, filteredProducts } = useSelector((state: any) => state);

  const [currentData, setCurrentData] = useState<any>(null);

  const [filterQuery, setFilterQuery] = useState<any>({
    category: [],
    brand: [],
    price: { min: 0, max: 9999999 }
  });

  function onFilteringData(data: any, filterQuery?: any): any {

    const result = data.filter((item: any) => {
      const isInCategory = filterQuery['category'].length > 0 ? filterQuery['category'].some((param: any) => item['category'].toLowerCase().includes(param.toLowerCase())) : true;
      const isInBrand = filterQuery['brand'].length > 0 ? filterQuery['brand'].some((param: any) => item['brand'].toLowerCase().includes(param.toLowerCase())) : true;
      const isInPrice = (filterQuery['price'].min < Number(item['price'])) && Number(item['price']) < filterQuery['price'].max;
      
      return isInCategory && isInBrand && isInPrice;
    })

    return result;
  }

  useEffect(() => {
    dispatch({ type: "setFilteredProducts", payload: onFilteringData(products, filterQuery) });
    dispatch({ type: "setProductLength", payload: onFilteringData(products, filterQuery).length });
  }, [filterQuery]);

  useEffect(() => {
    dispatch({ type: "setFilteredProducts", payload: onFilteringData(products, filterQuery) });
  }, [products])

  useEffect(() => {
    setCurrentData(filterOptions);
  }, [filterOptions]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    updateFilterQuery({ key: name, value: type === 'number' ? Number(value) : value }, setFilterQuery);
  }

  return (
    <Section className={[styles.productsFiltering]}>
      {currentData && <>
        <Dropdown title="Category">
          {currentData.categories?.map((category: string, i:number) => <label key={category}><input type="checkbox" name="category" value={category} onChange={(e => handleInputChange(e))}/> {category} ({findProductsLength(filteredProducts,'category', category)})  <br /></label>)}
        </Dropdown>
        <Dropdown title="Brands">
        {currentData.brands?.map((brand: string) =>  <label key={brand}><input key={brand} type="checkbox" name="brand" value={brand} onChange={(e => handleInputChange(e))} /> {brand} ({findProductsLength(filteredProducts,'brand', brand)})<br /></label>)}
        </Dropdown>
        <Dropdown title="Price" isOpen>
          <input type="number" name="price_min" placeholder="min" defaultValue={currentData.minMaxPrice.min} onChange={(e => handleInputChange(e))} /> - <input name="price_max" placeholder="max" defaultValue={currentData.minMaxPrice.max} type="number" onChange={(e => handleInputChange(e))} />
        </Dropdown>
      </>
      }
    </Section >
  )
}

export default Filtering;