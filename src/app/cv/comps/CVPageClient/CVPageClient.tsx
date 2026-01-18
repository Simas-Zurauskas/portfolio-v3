'use client';

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer, Mail, Globe, MapPin, Linkedin, Phone } from 'lucide-react';

 
import '@fontsource/inter/400.css';
 
import '@fontsource/inter/500.css';
 
import '@fontsource/inter/600.css';
 
import '@fontsource/inter/700.css';
import type { CV } from './types';
import { cvData } from './cvData';
import {
  ContactItem,
  ContactList,
  Controls,
  CVContainer,
  DevBadge,
  EduItem,
  EduMeta,
  EduTitle,
  ExperienceCompany,
  ExperienceDate,
  ExperienceHeader,
  ExperienceItem,
  ExperienceList,
  ExperiencePoint,
  ExperiencePoints,
  ExperienceRole,
  Header,
  LanguageItem,
  LanguageLevel,
  LanguageName,
  MainContent,
  Name,
  PageWrapper,
  PrintButton,
  ProjectCard,
  ProjectDesc,
  ProjectMeta,
  ProjectName,
  ProjectsGrid,
  Section,
  SectionHeader,
  SectionLine,
  SectionTitle,
  Sidebar,
  SidebarSection,
  SidebarTitle,
  SkillTag,
  SkillTags,
  Summary,
  Title,
} from './styles';

const emptyCv: CV = {
  header: { name: '', title: '' },
  contact: {
    location: '',
    email: '',
    phone: '',
    websiteLabel: '',
    websiteUrl: '',
    linkedinLabel: '',
    linkedinUrl: '',
    githubLabel: '',
    githubUrl: '',
  },
  skills: [],
  languages: [],
  education: [],
  summary: '',
  experience: [],
  projects: [],
};

export const CVPageClient: React.FC = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const cv = cvData ?? emptyCv;

  const handlePrint = useReactToPrint({
    contentRef: cvRef,
    documentTitle: 'Simas_Zurauskas_CV',
    pageStyle: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      @page {
        size: 850px 1470px;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        * {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif !important;
        }
      }
    `,
  });

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
              {cv.contact.location ? (
                <ContactItem>
                  <MapPin />
                  <span>{cv.contact.location}</span>
                </ContactItem>
              ) : null}
              {cv.contact.email ? (
                <ContactItem>
                  <Mail />
                  <a href={`mailto:${cv.contact.email}`}>{cv.contact.email}</a>
                </ContactItem>
              ) : null}
              {cv.contact.phone ? (
                <ContactItem>
                  <Phone />
                  <a href={`tel:${cv.contact.phone.replaceAll(' ', '')}`}>{cv.contact.phone}</a>
                </ContactItem>
              ) : null}
              {cv.contact.websiteUrl && cv.contact.websiteLabel ? (
                <ContactItem>
                  <Globe />
                  <a href={cv.contact.websiteUrl}>{cv.contact.websiteLabel}</a>
                </ContactItem>
              ) : null}
              {cv.contact.linkedinUrl && cv.contact.linkedinLabel ? (
                <ContactItem>
                  <Linkedin />
                  <a href={cv.contact.linkedinUrl}>{cv.contact.linkedinLabel}</a>
                </ContactItem>
              ) : null}
              {/* {cv.contact.githubUrl && cv.contact.githubLabel ? (
                <ContactItem>
                  <Github />
                  <a href={cv.contact.githubUrl}>{cv.contact.githubLabel}</a>
                </ContactItem>
              ) : null} */}
            </ContactList>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Skills</SidebarTitle>
            <SkillTags>
              {cv.skills.map((skill) => (
                <SkillTag key={skill}>{skill}</SkillTag>
              ))}
            </SkillTags>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Languages</SidebarTitle>
            {cv.languages.map((l) => (
              <LanguageItem key={`${l.name}-${l.level}`}>
                <LanguageName>{l.name}</LanguageName>
                <LanguageLevel>{l.level}</LanguageLevel>
              </LanguageItem>
            ))}
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Education</SidebarTitle>
            {cv.education.map((e) => (
              <EduItem key={`${e.title}-${e.meta}`}>
                <EduTitle>{e.title}</EduTitle>
                <EduMeta>{e.meta}</EduMeta>
              </EduItem>
            ))}
          </SidebarSection>
        </Sidebar>

        {/* Main Content */}
        <MainContent>
          <Header>
            <Name>{cv.header.name}</Name>
            <Title>{cv.header.title}</Title>
          </Header>

          <Section>
            <SectionHeader>
              <SectionTitle>Summary</SectionTitle>
              <SectionLine />
            </SectionHeader>
            <Summary>{cv.summary}</Summary>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>Experience</SectionTitle>
              <SectionLine />
            </SectionHeader>
            <ExperienceList>
              {cv.experience.map((e) => (
                <ExperienceItem key={`${e.company}-${e.role}-${e.date}`}>
                  <ExperienceHeader>
                    <ExperienceRole>{e.role}</ExperienceRole>
                    <ExperienceDate>{e.date}</ExperienceDate>
                  </ExperienceHeader>
                  <ExperienceCompany>{e.company}</ExperienceCompany>
                  <ExperiencePoints>
                    {e.points.map((p) => (
                      <ExperiencePoint key={p}>{p}</ExperiencePoint>
                    ))}
                  </ExperiencePoints>
                </ExperienceItem>
              ))}
            </ExperienceList>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>Selected Work</SectionTitle>
              <SectionLine />
            </SectionHeader>
            <ProjectsGrid>
              {cv.projects.map((p) => (
                <ProjectCard key={`${p.name}-${p.meta}`} $featured={p.featured}>
                  <ProjectName>{p.name}</ProjectName>
                  <ProjectMeta>{p.meta}</ProjectMeta>
                  <ProjectDesc>{p.description}</ProjectDesc>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </Section>
        </MainContent>
      </CVContainer>
    </PageWrapper>
  );
};

