import React from 'react'
import Hero from '../../components/hero';
import CartButton from '../../components/button/cart-button';
import TrendButton from '../../components/button/trend-button';
import List from '../../components/list';

const Home = () => {
  return (
    <div className='relative'>
        <Hero />

        <CartButton />
        <TrendButton />

        <List />
    </div>
  )
}

export default Home;