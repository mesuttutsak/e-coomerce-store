import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';

import { getProducts } from '../../services';
import { useSelector, useDispatch } from 'react-redux';

import findMinMaxByProperty from '../../utils/findMinMaxByProperty';
import ErrorPage from '../../components/Pages/ErrorPage';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {

    interface FilterDataOptions {
        brands: string[];
        categories: string[];
        minMaxPrice: { min: number, max: number };
    };

    const dispatch = useDispatch();
    const { searchText } = useSelector((state: any) => state);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        dispatch({ type: "setProductsLoading", payload: true })
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

            dispatch({ type: "setProductsLoading", payload: false })

            dispatch({ type: "setFilterOptions", payload: filterOpt })
            dispatch({ type: "setProducts", payload: products });
        }).catch(err => {
            dispatch({ type: "setProductsLoading", payload: false })
            console.log(err)
            setIsError(true)
        });
        
    }, [searchText]);

    return (
        <>
            {isError ? <ErrorPage /> : <>
                <Header />
                <main>
                    {children}
                </main>
            </>
            }
        </>
    )
}

export default MainLayout;



