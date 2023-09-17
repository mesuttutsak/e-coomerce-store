import { ChangeEvent, useEffect, useState, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "../productsPageSections.module.scss";

import Dropdown from "../../../../Dropdown";
import Section from "../../../../Section";
import Text from "../../../../Text";
import { AiTwotoneStar } from "react-icons/ai";

const updateFilterQuery = (changeParams: { key: string, value: string | number }, setState: any) => {
  const { key, value } = changeParams;
  const isPathKey = key?.includes('_');

  setState((prevState: any) => {
    const updatedPrevState = { ...prevState };
    if (isPathKey) {
      alert(1)
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
    } else if (typeof updatedPrevState[key] == 'string' || typeof updatedPrevState[key] == 'number') {
      updatedPrevState[key] = value;
    } else {
      updatedPrevState[key] = updatedPrevState[key].includes(value) ? updatedPrevState[key].filter((param: string) => param !== value) : [...updatedPrevState[key], value];
    }
    return updatedPrevState;
  });
}

const findProductsLength = (arr: [], key: string, value?: string) => {
  return value ? arr?.filter((item: any) => item[key].includes(value)).length : arr.length;
}

function onFilteringData(data: any, filterQuery?: any): any {

  const result = data.filter((item: any) => {
    const isInCategory = filterQuery['category'] === 'all' ? true : item['category'].toLowerCase().includes(filterQuery['category'].toLowerCase());
    const isInBrand = filterQuery['brand'].length > 0 ? filterQuery['brand'].some((param: any) => item['brand'].toLowerCase().includes(param.toLowerCase())) : true;
    const isInPrice = (filterQuery['price'].min < Number(item['price'])) && Number(item['price']) < filterQuery['price'].max;
    const isHighestRating = filterQuery['rating'] <= Number(item['rating']);

    return isInCategory && isInBrand && isInPrice && isHighestRating;
  })

  return result;
}

interface FilteringListItemProps {
  children?: ReactNode;
  placeholder?: string;
  name: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultChecked?: boolean;
  defaultVal?: string | number;
  label?: string;
  tag?: string;
}

const Item = ({ children, name, tag = "p", placeholder, type, onChange, value, defaultChecked, defaultVal, label }: FilteringListItemProps) => {
  return (
    type === "number" ?
      <label className={styles.productsFilteringDropdownItem}>
        <input
          type={type}
          name={name}
          value={value}
          defaultValue={defaultVal}
          placeholder={placeholder}
          min={0}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        />
      </label>

      :

      <label className={styles.productsFilteringDropdownItem}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          defaultChecked={defaultChecked}
        />
        {type == 'checkbox' && <span className={styles.checkmark}></span>}
        <Text tag={tag} fontSize={"sm"}>{label ? label : children}</Text>
      </label>
  )
}

const Filtering = () => {
  const dispatch = useDispatch();

  const { filterOptions, products, filteredProducts } = useSelector((state: any) => state);

  const [currentData, setCurrentData] = useState<any>(null);
  const [filterQuery, setFilterQuery] = useState<any>({
    category: 'all',
    brand: [],
    rating: 1,
    price: { min: 0, max: 9999999 }
  });

  useEffect(() => {
    console.log(filterQuery);
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
    updateFilterQuery({ key: name, value: (type === 'number' || name === 'rating') ? Number(value) : value }, setFilterQuery);
  }

  const calcRating = (mahmut: number, param: number) => {
    return mahmut <= param
  }

  return (
    <Section className={[styles.productsFiltering]}>
      {currentData && <>

        <Dropdown title="Category">
          <Item type="radio" name="category" value="all" onChange={(e => handleInputChange(e))} defaultChecked={true}>All categories</Item>
          {currentData.categories?.map((category: string, i: number) =>
            <Item key={'category' + i} type="radio" name="category" value={category} onChange={(e => handleInputChange(e))}>{category} ({findProductsLength(products, 'category', category)})</Item>
          )}
        </Dropdown>
        <Dropdown title="Brands">
          {currentData.brands?.map((brand: string, i: number) => <Item key={'brand' + i} type="checkbox" name="brand" value={brand} onChange={(e => handleInputChange(e))}>{brand} ({findProductsLength(products, 'brand', brand)})</Item>)}
        </Dropdown>
        <Dropdown title="Rating" isOpen showMore={false}>
          <div className={styles.dropDownBodyContainer}>
            {Array.from({ length: 5 }, (_, index) => index).map((count: any) => {
              return <Item tag="span" type="radio" name="rating" value={count + 1} onChange={(e => handleInputChange(e))}>
                <AiTwotoneStar size={20} color={calcRating(count + 1, filterQuery.rating) ? 'orange' : '#d3ccc5'} />
              </Item>
            })}
          </div>
        </Dropdown>
        <Dropdown title="Price" isOpen showMore={false}>
          <div className={styles.dropDownBodyContainer}>
            <Item type="number" name="price_min" placeholder="min" defaultVal={currentData.minMaxPrice.min} onChange={(e => handleInputChange(e))} />
            <Text lineHeight="none">-</Text>
            <Item type="number" name="price_max" placeholder="max" defaultVal={currentData.minMaxPrice.max} onChange={(e => handleInputChange(e))} />
            <Text lineHeight="none">$</Text>
          </div>
        </Dropdown>
      </>
      }
    </Section >
  )
}

export default Filtering;