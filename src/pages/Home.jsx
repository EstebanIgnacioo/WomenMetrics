import React from 'react';
import Hero from '../components/pages/Hero'; 
import NavBar from '../components/pages/NavBar';
import FeatureSection from '../components/pages/FeatureSection';
import Footer from '../components/pages/Footer';


function Home() {
  
  return (
    <>
      <NavBar />
      <Hero />
      <FeatureSection/>
      <Footer/>
    </>
  );
}

export default Home;
