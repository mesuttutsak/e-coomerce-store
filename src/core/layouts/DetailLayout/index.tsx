import { Outlet } from 'react-router-dom';

import MainLayout from '../MainLayout';

const DetailLayout = () => {
  
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

export default DetailLayout;