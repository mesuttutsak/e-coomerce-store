import React, { ReactNode, useEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import { getCategories, getProducts } from '../../services';
import { useSelector } from 'react-redux';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const dispatch = useDispatch();
    const {searchText} = useSelector((state:any) => state)

    useEffect(() => {
        getCategories().then(data => dispatch({ type: "setCategories", payload: data }))
        getProducts({search:searchText}).then((data:any) => {
            dispatch({ type: "setProducts", payload: data.products });
            dispatch({ type: "setProductLength", payload: data.total });
        })
        .catch(console.log);
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