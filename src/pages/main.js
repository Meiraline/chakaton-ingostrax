import React from 'react';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import FooterSection from '../components/3_organism/FooterSection';
import AboutHeroSection from '../components/3_organism/AboutHeroSection';
import AboutSplitSection from '../components/3_organism/AboutSplitSection';
import AboutStepsSection from '../components/3_organism/AboutStepsSection';
import AboutCardsSection from '../components/3_organism/AboutCardsSection';
import AboutFinalCtaSection from '../components/3_organism/AboutFinalCtaSection';
import HomeBlogPreviewSection from '../components/3_organism/HomeBlogPreviewSection';
import { getArticles } from '../api/blog';
import { mainHeroCards, mainFeatureCards, mainSections } from '../data/mainPageContent';
import './MainPage.css';

const previewArticles = getArticles().slice(0, 3);

function MainPage() {
  return (
    <Layout>
      <Header />
      <div className="main-page">
        <main className="main-page__content">
          <div className="main-page__screen main-page__screen--hero">
            <AboutHeroSection {...mainSections.hero} cards={mainHeroCards} />
          </div>

          <div className="main-page__screen main-page__screen--balanced">
            <AboutSplitSection {...mainSections.overview} />
          </div>

          <div className="main-page__screen main-page__screen--cards">
            <AboutCardsSection {...mainSections.features} cards={mainFeatureCards} compact />
          </div>

          <div className="main-page__screen main-page__screen--steps">
            <AboutStepsSection {...mainSections.howItWorks} />
          </div>

          <div className="main-page__screen main-page__screen--balanced">
            <AboutSplitSection {...mainSections.blog} reverse />
          </div>

          <div className="main-page__screen main-page__screen--preview">
            <HomeBlogPreviewSection
              label="Статьи"
              title="С чего начать знакомство"
              text="Три короткие статьи помогут быстро понять базу и перейти к игре уже с контекстом."
              articles={previewArticles}
            />
          </div>

          <div className="main-page__screen main-page__screen--cta">
            <AboutFinalCtaSection {...mainSections.finalCta} />
          </div>
        </main>
        <FooterSection />
      </div>
    </Layout>
  );
}

export default MainPage;