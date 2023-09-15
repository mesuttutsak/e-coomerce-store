import React from 'react'
import FilteringSection from '../../Sections/FilteringSection';
import ProductsSection from '../../Sections/ProductsSection';

const HomePage = () => {
  return (
    <div className='page' id='home'>
        <FilteringSection/>
        <ProductsSection />
    </div>
  )
}

export default HomePage;