import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';

const Page404 = () => {
    const navigate = useNavigate();
    useEffect(() => {
     setTimeout(() => {
        navigate("/");
     }, 1000);   
    })
    return (
        <MainLayout>Sayfa Bulunamadı <Link to="/">Ana sayfaya dön</Link></MainLayout>
    )
}

export default Page404