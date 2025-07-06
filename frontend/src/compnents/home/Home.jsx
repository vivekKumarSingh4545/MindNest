import React from 'react';
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
import Navbar from '../navbar/Navbar';
const Home = () => {
  return (
    <div>
        <Navbar />
        <div className='mt-20'>
        <Home1 />
        <Home2 />
        <Home3 />
        </div>
    </div>
  )
}

export default Home