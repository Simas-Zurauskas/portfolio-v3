import styled from 'styled-components';

// Modern Harvard-inspired CV - clean, readable, professional
const cvColors = {
  background: '#ffffff',
  text: '#1a1a1a',
  muted: '#4a4a4a',
  light: '#6b7280',
  border: '#e5e7eb',
  accent: '#1e3a5f', // Deep navy for headers
} as const;

// Modern, readable font stack
const FONT_STACK = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const VariantButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  background: ${({ $active }) => ($active ? cvColors.accent : '#f3f4f6')};
  color: ${({ $active }) => ($active ? '#ffffff' : cvColors.muted)};
  border: 1px solid ${({ $active }) => ($active ? cvColors.accent : cvColors.border)};
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  font-family: ${FONT_STACK};
  transition: all 0.15s;

  &:hover {
    background: ${({ $active }) => ($active ? '#152d4a' : '#e5e7eb')};
  }
`;

export const PrintButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: ${cvColors.accent};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${FONT_STACK};
  transition: background 0.2s;

  &:hover {
    background: #152d4a;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const DevBadge = styled.span`
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: ${FONT_STACK};
`;

// CV Container - 850px width, calibrated for single-page print
export const CVContainer = styled.div`
  width: 850px;
  min-height: 2600px;
  background: ${cvColors.background};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 48px 56px;
  font-family: ${FONT_STACK};
  color: ${cvColors.text};
  line-height: 1.6;

  * {
    font-family: ${FONT_STACK};
  }

  @media print {
    box-shadow: none;
  }
`;

// Header - centered name and title
export const Header = styled.header`
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 2px solid ${cvColors.accent};
`;

export const Name = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${cvColors.accent};
  margin: 0 0 8px 0;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  font-size: 15px;
  font-weight: 400;
  color: ${cvColors.muted};
  margin: 0;
  letter-spacing: 0.02em;
`;

// Contact info - horizontal centered line
export const ContactBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin-bottom: 32px;
  font-size: 13px;
  color: ${cvColors.text};
`;

export const ContactItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 14px;
    height: 14px;
    color: ${cvColors.light};
  }

  a {
    color: ${cvColors.text};
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${cvColors.accent};
    }
  }
`;

export const ContactDivider = styled.span`
  color: ${cvColors.border};
  font-weight: 300;
`;

// Main sections
export const Section = styled.section`
  margin-bottom: 28px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: ${cvColors.accent};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0 0 14px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid ${cvColors.border};
`;

// Summary
export const Summary = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: ${cvColors.text};
  margin: 0;
  white-space: pre-line;
`;

// Education
export const EducationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EducationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const EducationContent = styled.div``;

export const EducationTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${cvColors.text};
  margin: 0;
`;

export const EducationMeta = styled.p`
  font-size: 13px;
  color: ${cvColors.muted};
  margin: 4px 0 0 0;
`;

export const EducationDate = styled.span`
  font-size: 13px;
  color: ${cvColors.light};
  white-space: nowrap;
`;

// Experience
export const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ExperienceItem = styled.div``;

export const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

export const ExperienceRole = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${cvColors.text};
  margin: 0;
`;

export const ExperienceDate = styled.span`
  font-size: 13px;
  color: ${cvColors.light};
  white-space: nowrap;
  font-weight: 500;
`;

export const ExperienceCompany = styled.p`
  font-size: 13px;
  color: ${cvColors.muted};
  margin: 0 0 10px 0;
`;

export const ExperiencePoints = styled.ul`
  margin: 0;
  padding: 0 0 0 20px;
  list-style: none;
`;

export const ExperiencePoint = styled.li`
  font-size: 13px;
  line-height: 1.65;
  color: ${cvColors.text};
  margin-bottom: 6px;
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: -16px;
    color: ${cvColors.accent};
    font-weight: 700;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

// Skills - inline list
export const SkillsContainer = styled.div`
  font-size: 13px;
  line-height: 1.8;
`;

export const SkillCategory = styled.div`
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SkillLabel = styled.span`
  font-weight: 600;
  color: ${cvColors.text};
`;

export const SkillList = styled.span`
  color: ${cvColors.text};
`;

// Languages - inline
export const LanguagesContainer = styled.div`
  font-size: 13px;
  line-height: 1.7;
`;

export const LanguageItem = styled.span`
  color: ${cvColors.text};
`;

// Projects
export const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProjectItem = styled.div``;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

export const ProjectName = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${cvColors.text};
  margin: 0;
`;

export const ProjectMeta = styled.span`
  font-size: 12px;
  color: ${cvColors.light};
  font-weight: 500;
`;

export const ProjectDesc = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${cvColors.text};
  margin: 0;
`;

// Legacy exports for compatibility (unused in Harvard style but kept for type safety)
export const Sidebar = styled.aside``;
export const SidebarSection = styled.div``;
export const SidebarTitle = styled.h3``;
export const ContactList = styled.ul``;
export const SkillTags = styled.div``;
export const SkillTag = styled.span``;
export const LanguageName = styled.span``;
export const LanguageLevel = styled.span``;
export const EduItem = styled.div``;
export const EduTitle = styled.h4``;
export const EduMeta = styled.p``;
export const MainContent = styled.main``;
export const SectionHeader = styled.div``;
export const SectionLine = styled.div``;
export const SectionNote = styled.p`
  font-size: 12px;
  font-style: italic;
  color: ${cvColors.light};
  margin: 0 0 12px 0;
`;
export const ProjectsGrid = styled.div``;
export const ProjectCard = styled.div<{ $featured?: boolean }>``;
