'use client';

import React, { useRef } from 'react';
import styled from 'styled-components';
import { useReactToPrint } from 'react-to-print';
import { notFound } from 'next/navigation';
import { Printer, Mail, Globe, MapPin, Linkedin, Github } from 'lucide-react';

// Only available in development
const isDev = process.env.NODE_ENV === 'development';

// Design tokens
const colors = {
  sidebar: '#0f172a',
  sidebarText: '#e2e8f0',
  sidebarMuted: '#94a3b8',
  sidebarAccent: '#ff6b35',
  main: '#ffffff',
  mainText: '#0f172a',
  mainMuted: '#64748b',
  mainLight: '#94a3b8',
  border: '#e2e8f0',
  accent: '#ff6b35',
};

const FONT_STACK = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;

// Page wrapper
const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const PrintButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const DevBadge = styled.span`
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

// CV Container - 850 x 1200
const CVContainer = styled.div`
  width: 850px;
  min-height: 1200px;
  background: ${colors.main};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  display: grid;
  grid-template-columns: 280px 1fr;
  font-family: ${FONT_STACK};
  overflow: hidden;

  * {
    font-family: ${FONT_STACK};
  }

  @media print {
    box-shadow: none;
  }
`;

// Sidebar
const Sidebar = styled.aside`
  background: ${colors.sidebar};
  color: ${colors.sidebarText};
  padding: 48px 28px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const SidebarSection = styled.div``;

const SidebarTitle = styled.h3`
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${colors.sidebarAccent};
  margin: 0 0 16px 0;
`;

// Contact section
const ContactList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContactItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  color: ${colors.sidebarText};

  svg {
    width: 14px;
    height: 14px;
    color: ${colors.sidebarMuted};
    flex-shrink: 0;
  }

  a {
    color: ${colors.sidebarText};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
  }
`;

// Skills section
const SkillCategory = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillLabel = styled.h4`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${colors.sidebarText};
  margin: 0 0 6px 0;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const SkillTag = styled.span`
  font-size: 0.65rem;
  color: ${colors.sidebarMuted};
  background: rgba(255, 255, 255, 0.08);
  padding: 3px 8px;
  border-radius: 3px;
`;

// Languages
const LanguageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LanguageName = styled.span`
  color: ${colors.sidebarText};
`;

const LanguageLevel = styled.span`
  color: ${colors.sidebarMuted};
  font-size: 0.65rem;
`;

// Education sidebar
const EduItem = styled.div`
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const EduTitle = styled.h4`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${colors.sidebarText};
  margin: 0 0 2px 0;
`;

const EduMeta = styled.p`
  font-size: 0.65rem;
  color: ${colors.sidebarMuted};
  margin: 0;
`;

// Main content
const MainContent = styled.main`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

// Header
const Header = styled.header`
  margin-bottom: 8px;
`;

const Name = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: ${colors.mainText};
  letter-spacing: -0.03em;
  margin: 0 0 6px 0;
  line-height: 1.1;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.mainMuted};
  margin: 0;
`;

// Main sections
const Section = styled.section``;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${colors.accent};
  margin: 0;
`;

const SectionLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${colors.border};
`;

// Summary
const Summary = styled.p`
  font-size: 0.85rem;
  line-height: 1.7;
  color: ${colors.mainText};
  margin: 0;
`;

// Experience
const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ExperienceItem = styled.div``;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const ExperienceRole = styled.h4`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${colors.mainText};
  margin: 0;
`;

const ExperienceDate = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${colors.mainLight};
  white-space: nowrap;
`;

const ExperienceCompany = styled.p`
  font-size: 0.8rem;
  color: ${colors.mainMuted};
  margin: 0 0 8px 0;
`;

const ExperiencePoints = styled.ul`
  margin: 0;
  padding: 0 0 0 16px;
  list-style: none;
`;

const ExperiencePoint = styled.li`
  font-size: 0.78rem;
  line-height: 1.6;
  color: ${colors.mainText};
  margin-bottom: 4px;
  position: relative;

  &::before {
    content: '—';
    position: absolute;
    left: -16px;
    color: ${colors.accent};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

// Projects
const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const ProjectCard = styled.div`
  padding: 14px;
  background: #f8fafc;
  border-radius: 6px;
`;

const ProjectName = styled.h4`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${colors.mainText};
  margin: 0 0 2px 0;
`;

const ProjectMeta = styled.p`
  font-size: 0.65rem;
  color: ${colors.mainMuted};
  margin: 0 0 6px 0;
`;

const ProjectDesc = styled.p`
  font-size: 0.7rem;
  line-height: 1.5;
  color: ${colors.mainMuted};
  margin: 0;
`;

export default function CVPage() {
  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: cvRef,
    documentTitle: 'Simas_Zurauskas_CV',
    pageStyle: `
      @page {
        size: 850px 1200px;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  // Block access in production
  if (!isDev) {
    notFound();
  }

  return (
    <PageWrapper>
      <Controls>
        <DevBadge>Dev Only</DevBadge>
        <PrintButton onClick={() => handlePrint()}>
          <Printer />
          Print / Save PDF
        </PrintButton>
      </Controls>

      <CVContainer ref={cvRef}>
        {/* Sidebar */}
        <Sidebar>
          <SidebarSection>
            <SidebarTitle>Contact</SidebarTitle>
            <ContactList>
              <ContactItem>
                <MapPin />
                <span>Vilnius, Lithuania</span>
              </ContactItem>
              <ContactItem>
                <Mail />
                <a href="mailto:hello@simaszurauskas.com">hello@simaszurauskas.com</a>
              </ContactItem>
              <ContactItem>
                <Globe />
                <a href="https://simaszurauskas.com">simaszurauskas.com</a>
              </ContactItem>
              <ContactItem>
                <Linkedin />
                <a href="https://linkedin.com/in/simaszurauskas">linkedin.com/in/simaszurauskas</a>
              </ContactItem>
              <ContactItem>
                <Github />
                <a href="https://github.com/simaszurauskas">github.com/simaszurauskas</a>
              </ContactItem>
            </ContactList>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Skills</SidebarTitle>

            <SkillCategory>
              <SkillLabel>Frontend</SkillLabel>
              <SkillTags>
                <SkillTag>React</SkillTag>
                <SkillTag>Next.js</SkillTag>
                <SkillTag>TypeScript</SkillTag>
                <SkillTag>React Native</SkillTag>
              </SkillTags>
            </SkillCategory>

            <SkillCategory>
              <SkillLabel>Backend</SkillLabel>
              <SkillTags>
                <SkillTag>Node.js</SkillTag>
                <SkillTag>PostgreSQL</SkillTag>
                <SkillTag>MongoDB</SkillTag>
                <SkillTag>GraphQL</SkillTag>
              </SkillTags>
            </SkillCategory>

            <SkillCategory>
              <SkillLabel>AI / ML</SkillLabel>
              <SkillTags>
                <SkillTag>LangChain</SkillTag>
                <SkillTag>OpenAI</SkillTag>
                <SkillTag>RAG</SkillTag>
                <SkillTag>Agents</SkillTag>
              </SkillTags>
            </SkillCategory>

            <SkillCategory>
              <SkillLabel>DevOps</SkillLabel>
              <SkillTags>
                <SkillTag>AWS</SkillTag>
                <SkillTag>Docker</SkillTag>
                <SkillTag>CI/CD</SkillTag>
                <SkillTag>Vercel</SkillTag>
              </SkillTags>
            </SkillCategory>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Languages</SidebarTitle>
            <LanguageItem>
              <LanguageName>English</LanguageName>
              <LanguageLevel>Fluent</LanguageLevel>
            </LanguageItem>
            <LanguageItem>
              <LanguageName>Lithuanian</LanguageName>
              <LanguageLevel>Native</LanguageLevel>
            </LanguageItem>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Education</SidebarTitle>
            <EduItem>
              <EduTitle>AI Engineering</EduTitle>
              <EduMeta>Turing College · 2025</EduMeta>
            </EduItem>
            <EduItem>
              <EduTitle>Computer Science</EduTitle>
              <EduMeta>Vilnius University · 2017</EduMeta>
            </EduItem>
          </SidebarSection>
        </Sidebar>

        {/* Main Content */}
        <MainContent>
          <Header>
            <Name>Simas Žurauskas</Name>
            <Title>Senior Software Engineer · Full Stack · AI</Title>
          </Header>

          <Section>
            <SectionHeader>
              <SectionTitle>Profile</SectionTitle>
              <SectionLine />
            </SectionHeader>
            <Summary>
              Full-stack engineer with 7+ years building production software across web, mobile, and AI. I own projects
              end-to-end — from architecture and implementation to deployment and maintenance. Track record of
              delivering complex products for startups and enterprises in fintech, healthtech, and SaaS. Strong focus on
              clean code, modern tooling, and shipping fast without cutting corners.
            </Summary>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>Experience</SectionTitle>
              <SectionLine />
            </SectionHeader>
            <ExperienceList>
              <ExperienceItem>
                <ExperienceHeader>
                  <ExperienceRole>Senior Engineer / Tech Lead</ExperienceRole>
                  <ExperienceDate>2020 — Present</ExperienceDate>
                </ExperienceHeader>
                <ExperienceCompany>Freelance & Contract</ExperienceCompany>
                <ExperiencePoints>
                  <ExperiencePoint>
                    Led development of 30+ products across fintech, healthtech, edtech, and enterprise
                  </ExperiencePoint>
                  <ExperiencePoint>Managed teams of 3–8 engineers; owned architecture and delivery</ExperiencePoint>
                  <ExperiencePoint>Built AI-powered platforms with LangChain, RAG, and custom agents</ExperiencePoint>
                  <ExperiencePoint>Delivered mobile apps (React Native) from MVP to App Store launch</ExperiencePoint>
                </ExperiencePoints>
              </ExperienceItem>

              <ExperienceItem>
                <ExperienceHeader>
                  <ExperienceRole>Software Engineer</ExperienceRole>
                  <ExperienceDate>2017 — 2020</ExperienceDate>
                </ExperienceHeader>
                <ExperienceCompany>Turing College & Agencies</ExperienceCompany>
                <ExperiencePoints>
                  <ExperiencePoint>Built and maintained web applications for enterprise clients</ExperiencePoint>
                  <ExperiencePoint>Established coding standards and mentored junior developers</ExperiencePoint>
                  <ExperiencePoint>Specialized in React ecosystem, Node.js, and cloud infrastructure</ExperiencePoint>
                </ExperiencePoints>
              </ExperienceItem>
            </ExperienceList>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>Selected Projects</SectionTitle>
              <SectionLine />
            </SectionHeader>
            <ProjectsGrid>
              <ProjectCard>
                <ProjectName>Strive</ProjectName>
                <ProjectMeta>Solo · Full Stack · EdTech</ProjectMeta>
                <ProjectDesc>
                  AI learning platform with 4 agents generating personalized courses. Next.js, LangChain, credit-based
                  billing.
                </ProjectDesc>
              </ProjectCard>

              <ProjectCard>
                <ProjectName>Withinly</ProjectName>
                <ProjectMeta>Tech Lead · Team of 4 · HealthTech</ProjectMeta>
                <ProjectDesc>
                  Mental wellness app with RAG-powered AI companion and personality assessments. Led full stack +
                  DevOps.
                </ProjectDesc>
              </ProjectCard>

              <ProjectCard>
                <ProjectName>MCR Perks</ProjectName>
                <ProjectMeta>Mobile Lead · Team of 4 · Lifestyle</ProjectMeta>
                <ProjectDesc>
                  Discovery app for local hotspots with subscriptions. React Native, RevenueCat, WordPress CMS.
                </ProjectDesc>
              </ProjectCard>

              <ProjectCard>
                <ProjectName>Circle of Trust</ProjectName>
                <ProjectMeta>Frontend Lead · Team of 8 · Social</ProjectMeta>
                <ProjectDesc>
                  Professional networking app built on trust. QR connections, 52 email templates, iOS/Android.
                </ProjectDesc>
              </ProjectCard>
            </ProjectsGrid>
          </Section>
        </MainContent>
      </CVContainer>
    </PageWrapper>
  );
}
