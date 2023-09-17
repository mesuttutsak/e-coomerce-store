import React from 'react';
import Header from '../../components/Header';

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