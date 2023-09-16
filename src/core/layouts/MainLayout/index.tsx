import React, { ReactNode, useEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                dispatch({ type: "setProducts", payload: data.products })
                dispatch({ type: "productLength", payload: data.total })
            }
            );

        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => dispatch({ type: "setCategories", payload: data })
        );

    }, []);

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