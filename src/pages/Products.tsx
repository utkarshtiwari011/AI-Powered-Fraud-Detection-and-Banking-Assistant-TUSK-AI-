
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductHero from '@/components/products/ProductHero';
import ProductTabs from '@/components/products/ProductTabs';
import ProductDemo from '@/components/products/ProductDemo';

const Products = () => {
  return (
    <Layout>
      <ProductHero />
      <ProductTabs />
      <ProductDemo />
    </Layout>
  );
};

export default Products;
