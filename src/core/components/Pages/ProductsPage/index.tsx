import React from 'react';
import ProductsSections from './Sections';
import { renderClasses } from '../../../utils/renderClasses';

const ProductsPage = () => {
  return (
    <div className={'_container'} id={'products'}>
        <ProductsSections />
    </div>
  )
}

export default ProductsPage;