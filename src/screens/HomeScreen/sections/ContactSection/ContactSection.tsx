'use client';

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Send, Check, AlertCircle, Copy } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslations } from 'next-intl';
import { SectionWrapper, Button } from '@/components';
import { EMAIL } from '@/conf';

const Content = styled.div`
  width: 100%;
  max-width: 800px;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 48px;
  max-width: 600px;
`;

const EmailRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 48px;

  a {
    color: ${({ theme }) => theme.colors.foreground};
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;

    @media (hover: hover) {
      &:hover {
        color: ${({ theme }) => theme.colors.accent};
      }
    }
  }
`;

const CopyButton = styled.button<{ $copied: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  min-height: unset;
  min-width: unset;
  flex-shrink: 0;
  padding: 0;
  background: ${({ theme, $copied }) => ($copied ? `${theme.hex.success}15` : 'transparent')};
  border: 1px solid ${({ theme, $copied }) => ($copied ? theme.colors.success : theme.colors.border)};
  color: ${({ theme, $copied }) => ($copied ? theme.colors.success : theme.colors.muted)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme, $copied }) => ($copied ? theme.colors.success : theme.colors.accent)};
    color: ${({ theme, $copied }) => ($copied ? theme.colors.success : theme.colors.accent)};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const Input = styled.input`
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 16px; /* Prevent iOS zoom on focus */
  font-family: inherit;
  transition: all 0.2s ease;
  min-height: 52px;
  border-radius: 0; /* Consistent across browsers */

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.hex.accent}25;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 16px; /* Prevent iOS zoom on focus */
  font-family: inherit;
  min-height: 160px;
  resize: none;
  transition: all 0.2s ease;
  border-radius: 0; /* Consistent across browsers */

  @media (max-width: 480px) {
    min-height: 140px;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.hex.accent}25;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SubmitButtonWrapper = styled.div<{ $status: 'idle' | 'loading' | 'success' | 'error' }>`
  align-self: flex-start;

  @media (max-width: 480px) {
    align-self: stretch;
    width: 100%;

    button {
      width: 100%;
    }
  }

  button {
    ${({ $status, theme }) =>
      $status === 'success' &&
      `
      background: ${theme.colors.success} !important;
      border-color: ${theme.colors.success} !important;
      &:hover { 
        background: ${theme.hex.success}dd !important;
        border-color: ${theme.hex.success}dd !important;
      }
    `}
    ${({ $status, theme }) =>
      $status === 'error' &&
      `
      background: ${theme.colors.error} !important;
      border-color: ${theme.colors.error} !important;
      &:hover { 
        background: ${theme.hex.error}dd !important;
        border-color: ${theme.hex.error}dd !important;
      }
    `}
  }
`;

const StatusMessage = styled.p<{ $type: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: ${({ theme, $type }) => ($type === 'success' ? theme.colors.success : theme.colors.error)};

  svg {
    width: 16px;
    height: 16px;
  }
`;

const RecaptchaNotice = styled.p`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 16px;

  a {
    color: ${({ theme }) => theme.colors.muted};
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme.colors.foreground};
    }
  }
`;

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export const ContactSection: React.FC = () => {
  const t = useTranslations('Contact');
  const tc = useTranslations('Common');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = EMAIL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('loading');
      setErrorMessage('');

      if (!executeRecaptcha) {
        setStatus('error');
        setErrorMessage(t('FORM.RECAPTCHA_NOT_READY'));
        setTimeout(() => setStatus('idle'), 5000);
        return;
      }

      try {
        // Get reCAPTCHA token
        const recaptchaToken = await executeRecaptcha('contact_form');

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, recaptchaToken }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to send message');
        }

        setStatus('success');
        setFormData({ name: '', email: '', message: '' });

        // Reset to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } catch (error) {
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');

        // Reset to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      }
    },
    [executeRecaptcha, formData],
  );

  const sectionTitle = t.raw('TITLE') as Array<Array<{ text: string; type?: 'normal' | 'accent' | 'muted' }>>;

  return (
    <SectionWrapper
      id="contact"
      index="03"
      label={t('LABEL')}
      title={sectionTitle}
      sidebarText={t('SIDEBAR_LEFT')}
      sidebarRightText={t('SIDEBAR_RIGHT')}
    >
      <Content>
        <Description>{t('DESCRIPTION')}</Description>

        <EmailRow>
          <a href={`mailto:${EMAIL}`} target="_blank" rel="noopener noreferrer">
            {EMAIL}
          </a>
          <CopyButton
            $copied={copied}
            onClick={copyEmail}
            aria-label={copied ? tc('COPIED') : tc('COPY_EMAIL')}
            title={copied ? tc('COPIED') : tc('COPY_EMAIL')}
          >
            {copied ? <Check /> : <Copy />}
          </CopyButton>
        </EmailRow>

        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="name">{t('FORM.NAME_LABEL')}</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder={t('FORM.NAME_PLACEHOLDER')}
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">{t('FORM.EMAIL_LABEL')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t('FORM.EMAIL_PLACEHOLDER')}
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="message">{t('FORM.MESSAGE_LABEL')}</Label>
            <TextArea
              id="message"
              name="message"
              placeholder={t('FORM.MESSAGE_PLACEHOLDER')}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
            />
          </FormGroup>

          <SubmitButtonWrapper $status={status}>
            <Button
              type="submit"
              size="lg"
              loading={status === 'loading'}
              icon={status === 'success' ? <Check /> : status === 'error' ? <AlertCircle /> : <Send />}
            >
              {status === 'success' && t('FORM.SUBMIT_SUCCESS')}
              {status === 'error' && t('FORM.SUBMIT_ERROR')}
              {(status === 'idle' || status === 'loading') &&
                (status === 'loading' ? t('FORM.SUBMIT_LOADING') : t('FORM.SUBMIT'))}
            </Button>
          </SubmitButtonWrapper>

          {status === 'success' && (
            <StatusMessage $type="success">
              <Check /> {t('FORM.SUCCESS_MESSAGE')}
            </StatusMessage>
          )}

          {status === 'error' && (
            <StatusMessage $type="error">
              <AlertCircle /> {errorMessage}
            </StatusMessage>
          )}

          <RecaptchaNotice>
            {t('RECAPTCHA.PROTECTED_BY')}{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              {t('RECAPTCHA.PRIVACY')}
            </a>{' '}
            &{' '}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
              {t('RECAPTCHA.TERMS')}
            </a>
          </RecaptchaNotice>
        </Form>
      </Content>
    </SectionWrapper>
  );
};
