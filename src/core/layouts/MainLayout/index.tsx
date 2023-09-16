import React, { useEffect, useLayoutEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../services';
import { useSelector } from 'react-redux';
import findMinMaxByProperty from '../../utils/findMinMaxByProperty';

interface MainLayoutProps {
    children: React.ReactNode;
}
interface FilterDataOptions {
    brands: string[];
    categories: string[];
    minMaxPrice: { min: number, max: number };
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const dispatch = useDispatch();
    const { searchText } = useSelector((state: any) => state)

    useEffect(() => {
        const fetchQuery = {limit: 100}
        if (searchText) Object.assign(fetchQuery, {q:searchText});

        getProducts(fetchQuery, searchText).then((data: any) => {
            const { total, products } = data;

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
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    )
}

export default MainLayout