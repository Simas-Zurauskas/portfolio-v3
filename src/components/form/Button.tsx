'use client';

import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const sizeStyles = {
  sm: css`
    padding: 10px 20px;
    font-size: 0.65rem;
    min-height: 40px;

    @media (max-width: 480px) {
      padding: 12px 20px;
      min-height: 44px;
    }
  `,
  md: css`
    padding: 14px 28px;
    font-size: 0.7rem;
    min-height: 48px;

    @media (max-width: 480px) {
      padding: 14px 24px;
      min-height: 48px;
    }
  `,
  lg: css`
    padding: 18px 36px;
    font-size: 0.75rem;
    min-height: 56px;

    @media (max-width: 480px) {
      padding: 16px 28px;
      font-size: 0.7rem;
      min-height: 52px;
    }
  `,
};

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.foreground};
    color: ${({ theme }) => theme.colors.background};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.accent};
      transform: translateY(-2px);
      box-shadow: 0 10px 30px ${({ theme }) => theme.hex.accent}25;
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.foreground};
    border: 2px solid ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.foreground};
      background: ${({ theme }) => theme.colors.surfaceAlt};
    }
  `,
};

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $hasIcon: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const LoadingSpinner = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $hasIcon={!!icon}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          {children}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </StyledButton>
  );
};
