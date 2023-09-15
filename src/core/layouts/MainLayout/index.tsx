import { ReactNode } from 'react';
import Header from '../../components/Header';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <Header/>
            <main className='_container'>
                {children}
            </main>
        </>
    )
}

export default MainLayout