import styled, { css } from 'styled-components';

// Keep CV print layout stable regardless of site theme.
const cvColors = {
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
} as const;

const FONT_STACK = `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif`;

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
  gap: 16px;
  align-items: center;
`;

export const PrintButton = styled.button`
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
`;

// CV Container - 850 x 1200
export const CVContainer = styled.div`
  width: 850px;
  min-height: 1320px;
  background: ${cvColors.main};
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
export const Sidebar = styled.aside`
  background: ${cvColors.sidebar};
  color: ${cvColors.sidebarText};
  padding: 48px 28px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const SidebarSection = styled.div``;

export const SidebarTitle = styled.h3`
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${cvColors.sidebarAccent};
  margin: 0 0 16px 0;
`;

// Contact section
export const ContactList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContactItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  color: ${cvColors.sidebarText};

  svg {
    width: 14px;
    height: 14px;
    color: ${cvColors.sidebarMuted};
    flex-shrink: 0;
  }

  a {
    color: ${cvColors.sidebarText};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
  }
`;

// Skills section
export const SkillCategory = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SkillLabel = styled.h4`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${cvColors.sidebarText};
  margin: 0 0 6px 0;
`;

export const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const SkillTag = styled.span`
  font-size: 0.68rem;
  color: ${cvColors.sidebarText};
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 10px;
  border-radius: 4px;
`;

// Languages
export const LanguageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const LanguageName = styled.span`
  color: ${cvColors.sidebarText};
`;

export const LanguageLevel = styled.span`
  color: ${cvColors.sidebarMuted};
  font-size: 0.65rem;
`;

// Education sidebar
export const EduItem = styled.div`
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const EduTitle = styled.h4`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${cvColors.sidebarText};
  margin: 0 0 2px 0;
`;

export const EduMeta = styled.p`
  font-size: 0.65rem;
  color: ${cvColors.sidebarMuted};
  margin: 0;
`;

// Main content
export const MainContent = styled.main`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

// Header
export const Header = styled.header`
  margin-bottom: 8px;
`;

export const Name = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: ${cvColors.mainText};
  letter-spacing: -0.03em;
  margin: 0 0 6px 0;
  line-height: 1.1;
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  color: ${cvColors.mainMuted};
  margin: 0;
`;

// Main sections
export const Section = styled.section``;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h3`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${cvColors.accent};
  margin: 0;
`;

export const SectionLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${cvColors.border};
`;

// Summary
export const Summary = styled.p`
  font-size: 0.85rem;
  line-height: 1.7;
  color: ${cvColors.mainText};
  margin: 0;
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
  font-size: 0.9rem;
  font-weight: 700;
  color: ${cvColors.mainText};
  margin: 0;
`;

export const ExperienceDate = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${cvColors.mainLight};
  white-space: nowrap;
`;

export const ExperienceCompany = styled.p`
  font-size: 0.8rem;
  color: ${cvColors.mainMuted};
  margin: 0 0 8px 0;
`;

export const ExperiencePoints = styled.ul`
  margin: 0;
  padding: 0 0 0 16px;
  list-style: none;
`;

export const ExperiencePoint = styled.li`
  font-size: 0.78rem;
  line-height: 1.6;
  color: ${cvColors.mainText};
  margin-bottom: 4px;
  position: relative;

  &::before {
    content: '—';
    position: absolute;
    left: -16px;
    color: ${cvColors.accent};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

// Projects - 2x2 grid with accent border
export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
`;

export const ProjectCard = styled.div<{ $featured?: boolean }>`
  ${({ $featured }) =>
    $featured &&
    css`
      grid-column: 1 / -1;
      border-left: 3px solid ${cvColors.accent};
      padding-left: 12px;
    `}
`;

export const ProjectName = styled.h4`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${cvColors.mainText};
  margin: 0 0 2px 0;
`;

export const ProjectMeta = styled.p`
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${cvColors.mainLight};
  margin: 0 0 8px 0;
`;

export const ProjectDesc = styled.p`
  font-size: 0.72rem;
  line-height: 1.6;
  color: ${cvColors.mainMuted};
  margin: 0;
`;

