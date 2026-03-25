'use client';

import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer, Mail, Globe, MapPin, Linkedin, Phone } from 'lucide-react';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import type { VariantId } from './types';
import { cvVariants, variants } from './cvData';
import {
  ContactBar,
  ContactDivider,
  ContactItem,
  Controls,
  CVContainer,
  EducationContent,
  EducationItem,
  EducationList,
  EducationMeta,
  EducationTitle,
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
  LanguagesContainer,
  Name,
  PageWrapper,
  PrintButton,
  ProjectDesc,
  ProjectHeader,
  ProjectItem,
  ProjectMeta,
  ProjectName,
  ProjectsList,
  Section,
  SectionNote,
  SectionTitle,
  SkillCategory,
  SkillLabel,
  SkillList,
  SkillsContainer,
  Summary,
  Title,
  VariantButton,
} from './styles';

export const CVPageClient: React.FC = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const [activeVariant, setActiveVariant] = useState<VariantId>('general');
  const cv = cvVariants[activeVariant];

  const handlePrint = useReactToPrint({
    contentRef: cvRef,
    documentTitle: 'Simas_Zurauskas_CV',
    pageStyle: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      @page {
        size: 850px 2340px;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }
      }
    `,
  });

  return (
    <PageWrapper>
      <Controls>
        {variants.map((v) => (
          <VariantButton key={v.id} $active={activeVariant === v.id} onClick={() => setActiveVariant(v.id)}>
            {v.label}
          </VariantButton>
        ))}
        <PrintButton onClick={() => handlePrint()}>
          <Printer />
          Print / Save PDF
        </PrintButton>
      </Controls>

      <CVContainer ref={cvRef}>
        {/* Header */}
        <Header>
          <Name>{cv.header.name}</Name>
          <Title>{cv.header.title}</Title>
        </Header>

        {/* Contact */}
        <ContactBar>
          {cv.contact.location && (
            <>
              <ContactItem>
                <MapPin />
                <span>{cv.contact.location}</span>
              </ContactItem>
              <ContactDivider>|</ContactDivider>
            </>
          )}
          {cv.contact.email && (
            <>
              <ContactItem>
                <Mail />
                <a href={`mailto:${cv.contact.email}`}>{cv.contact.email}</a>
              </ContactItem>
              <ContactDivider>|</ContactDivider>
            </>
          )}
          {cv.contact.phone && (
            <>
              <ContactItem>
                <Phone />
                <a href={`tel:${cv.contact.phone.replaceAll(' ', '')}`}>{cv.contact.phone}</a>
              </ContactItem>
              <ContactDivider>|</ContactDivider>
            </>
          )}
          {cv.contact.websiteUrl && cv.contact.websiteLabel && (
            <>
              <ContactItem>
                <Globe />
                <a href={cv.contact.websiteUrl}>{cv.contact.websiteLabel}</a>
              </ContactItem>
              <ContactDivider>|</ContactDivider>
            </>
          )}
          {cv.contact.linkedinUrl && cv.contact.linkedinLabel && (
            <ContactItem>
              <Linkedin />
              <a href={cv.contact.linkedinUrl}>{cv.contact.linkedinLabel}</a>
            </ContactItem>
          )}
        </ContactBar>

        {/* Summary */}
        <Section>
          <SectionTitle>Professional Summary</SectionTitle>
          <Summary>{cv.summary}</Summary>
        </Section>

        {/* Skills - categorized */}
        <Section>
          <SectionTitle>Technical Skills</SectionTitle>
          <SkillsContainer>
            {cv.skills.map((group) => (
              <SkillCategory key={group.category}>
                <SkillLabel>{group.category}: </SkillLabel>
                <SkillList>{group.items.join(', ')}</SkillList>
              </SkillCategory>
            ))}
          </SkillsContainer>
        </Section>

        {/* Experience */}
        <Section>
          <SectionTitle>Professional Experience</SectionTitle>
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

        {/* Selected Projects */}
        <Section>
          <SectionTitle>Selected Projects</SectionTitle>
          {cv.projectsNote && <SectionNote>{cv.projectsNote}</SectionNote>}
          <ProjectsList>
            {cv.projects.map((p) => (
              <ProjectItem key={`${p.name}-${p.meta}`}>
                <ProjectHeader>
                  <ProjectName>{p.name}</ProjectName>
                  <ProjectMeta>{p.meta}</ProjectMeta>
                </ProjectHeader>
                <ProjectDesc>{p.description}</ProjectDesc>
              </ProjectItem>
            ))}
          </ProjectsList>
        </Section>

        {/* Education */}
        <Section>
          <SectionTitle>Education</SectionTitle>
          <EducationList>
            {cv.education.map((e) => (
              <EducationItem key={`${e.title}-${e.meta}`}>
                <EducationContent>
                  <EducationTitle>{e.title}</EducationTitle>
                  <EducationMeta>{e.meta}</EducationMeta>
                </EducationContent>
              </EducationItem>
            ))}
          </EducationList>
        </Section>

        {/* Languages */}
        <Section>
          <SectionTitle>Languages</SectionTitle>
          <LanguagesContainer>
            {cv.languages.map((l, i) => (
              <React.Fragment key={`${l.name}-${l.level}`}>
                <LanguageItem>
                  {l.name} ({l.level})
                </LanguageItem>
                {i < cv.languages.length - 1 && ', '}
              </React.Fragment>
            ))}
          </LanguagesContainer>
        </Section>
      </CVContainer>
    </PageWrapper>
  );
};
