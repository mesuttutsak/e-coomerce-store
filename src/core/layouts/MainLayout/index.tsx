import React, { useEffect, useLayoutEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children  }: MainLayoutProps) => {

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