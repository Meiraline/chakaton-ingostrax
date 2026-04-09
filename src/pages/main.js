import React from 'react';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import HeroSection from '../components/3_organism/HeroSection';
import InfoSection from '../components/3_organism/InfoSection';
import BlogPreview from '../components/3_organism/BlogPreview';
import FooterSection from '../components/3_organism/FooterSection';

function MainPage() {
  return (
    <Layout>
      <Header />
      <main>
        <HeroSection />
        <InfoSection />
        <BlogPreview />
      </main>
      <FooterSection />
    </Layout>
  );
}

export default MainPage;
