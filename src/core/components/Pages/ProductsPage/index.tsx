import React, { useEffect } from 'react';
import ProductsSections from './Sections';
import MainLayout from '../../../layouts/MainLayout'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getProducts } from '../../../services';
import findMinMaxByProperty from '../../../utils/findMinMaxByProperty';

interface FilterDataOptions {
  brands: string[];
  categories: string[];
  minMaxPrice: { min: number, max: number };
};

const ProductsPage = () => {

  const dispatch = useDispatch();
  const { searchText } = useSelector((state: any) => state)

  useEffect(() => {

      const fetchQuery = { limit: 100 }
      if (searchText !== "") Object.assign(fetchQuery, { q: searchText });

      getProducts(fetchQuery, searchText !== "").then((data: any) => {
        const { products } = data;

        const brands: string[] = [];
        const categories: string[] = [];
        const { min: minPrice, max: maxPrice } = findMinMaxByProperty(products, 'price');

        products.forEach((product: any) => {
          const { brand, category } = product;
          !brands.some(item => item === brand) && brands.push(brand);
          !categories.some(item => item === category) && categories.push(category);
        });

        let filterOpt: FilterDataOptions = {
          brands: brands,
          categories: categories,
          minMaxPrice: { min: minPrice, max: maxPrice }
        }


        dispatch({ type: "setFilterOptions", payload: filterOpt })
        dispatch({ type: "setProducts", payload: products });

      })
        .catch(console.log);
  }, [searchText]);

  return (
    <MainLayout>
      <div className={'_container'} id={'products'}>
        <ProductsSections />
      </div>
    </MainLayout>
  )
}

export default ProductsPage;

