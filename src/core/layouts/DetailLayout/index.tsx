import React, { ReactNode } from 'react'
import MainLayout from '../MainLayout';
import ProductDetailPage from '../../components/Pages/ProductDetailPage';
import { Outlet, useParams } from 'react-router-dom';

const DetailLayout = ({children}: {children?:ReactNode}) => {
  const params = useParams();
  console.log(params);
  
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

export default DetailLayout;