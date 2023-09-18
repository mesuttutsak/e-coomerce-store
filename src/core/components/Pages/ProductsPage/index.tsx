import ProductsSections from './Sections';
import MainLayout from '../../../layouts/MainLayout'

const ProductsPage = () => {
  return (
    <MainLayout>
      <div className={'_container'} id={'products'}>
        <ProductsSections />
      </div>
    </MainLayout>
  )
}

export default ProductsPage;

