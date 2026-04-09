import React from 'react';
import Layout from '../components/4_unity/Layout';
import FooterSection from '../components/3_organism/FooterSection';
import LandingHeader from '../components/3_organism/LandingHeader';
import LandingHeroSection from '../components/3_organism/LandingHeroSection';
import LandingAboutSection from '../components/3_organism/LandingAboutSection';
import LandingBlogSection from '../components/3_organism/LandingBlogSection';
import './MainPage.css';

function MainPage() {
  return (
    <Layout>
      <div className="landing-page">
        <LandingHeader />
        <main className="landing-main">
          <LandingHeroSection />
          <LandingAboutSection />
          <LandingBlogSection />
        </main>
        <FooterSection />
      </div>
    </Layout>
  );
}

export default MainPage;