'use client';

import React from 'react';
import styled from 'styled-components';
import { Nav, Footer } from '@/components';
import { ServicesSection, ProcessSection, WorkSection, ContactSection } from './sections';
import { Hero1 } from './sections/Hero/variants/Hero1';

const Main = styled.main`
  min-height: 100vh;
`;

const HomeScreen: React.FC = () => {
  return (
    <Main>
      <Nav />
      <Hero1 />
      <ServicesSection />
      <ProcessSection />
      <WorkSection />
      <ContactSection />
      <Footer />
    </Main>
  );
};

export default HomeScreen;
