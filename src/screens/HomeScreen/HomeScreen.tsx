'use client';

import React from 'react';
import styled from 'styled-components';
import { Nav, Footer } from '@/components';
import { Hero, ServicesSection, WorkSection, ContactSection } from './sections';

const Main = styled.main`
  min-height: 100vh;
`;

const HomeScreen: React.FC = () => {
  return (
    <Main>
      <Nav />
      <Hero />
      <ServicesSection />
      <WorkSection />
      <ContactSection />
      <Footer />
    </Main>
  );
};

export default HomeScreen;
