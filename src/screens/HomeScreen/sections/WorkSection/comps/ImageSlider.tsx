'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import styled from 'styled-components';
import { useKeenSlider } from 'keen-slider/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import 'keen-slider/keen-slider.min.css';

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: transparent;

  .keen-slider {
    width: 100%;
    height: 100%;
    background: transparent;
  }

  .keen-slider__slide {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
    background: transparent;
  }
`;

const EmptyState = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const EmptyStateText = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.foreground};
  text-transform: uppercase;
  opacity: 0.35;
`;

const SlideImage = styled(Image)`
  object-fit: cover;
  transition: opacity 0.2s ease;
`;

const ExpandButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  min-height: unset;
  min-width: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.hex.surface}e6;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  z-index: 11;
  opacity: 0.85;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);

  @media (max-width: 768px) {
    display: none;
  }

  ${SliderContainer}:hover & {
    opacity: 1;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
    transform: scale(1.05);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 10;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  min-height: unset;
  min-width: unset;
  padding: 0;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.foreground : theme.colors.muted)};
  border-radius: 50%;
  background: ${({ theme, $active }) => ($active ? theme.colors.foreground : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.foreground};
    background: ${({ theme }) => theme.hex.foreground}40;
  }
`;

const Arrow = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => ($direction === 'left' ? 'left: 8px;' : 'right: 8px;')}
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  min-height: unset;
  min-width: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.hex.surfaceAlt}e6;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  z-index: 10;
  opacity: 0.85;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);

  ${SliderContainer}:hover & {
    opacity: 1;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
    transform: translateY(-50%) scale(1.05);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

// Lightbox Modal Styles
const LightboxOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.hex.background}f5;
  backdrop-filter: blur(20px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'all' : 'none')};
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const LightboxContent = styled.div`
  position: relative;
  width: 90vw;
  height: 90vh;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LightboxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

const LightboxTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  letter-spacing: -0.01em;
`;

const LightboxClose = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
    transform: rotate(90deg);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const LightboxSliderWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
`;

const LightboxSliderContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-radius: 2px;

  .keen-slider {
    width: 100%;
    height: 100%;
  }

  .keen-slider__slide {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
`;

const LightboxImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxImage = styled(Image)`
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  opacity: 1 !important;
`;

const LightboxArrow = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => ($direction === 'left' ? 'left: 20px;' : 'right: 20px;')}
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
    transform: translateY(-50%) scale(1.05);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    ${({ $direction }) => ($direction === 'left' ? 'left: 12px;' : 'right: 12px;')}

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const LightboxDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  min-height: 56px;
`;

const LightboxDot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  padding: 0;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.foreground : theme.colors.muted)};
  border-radius: 50%;
  background: ${({ theme, $active }) => ($active ? theme.colors.foreground : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.foreground};
    background: ${({ theme }) => theme.hex.foreground}60;
    transform: scale(1.2);
  }
`;

interface ImageSliderProps {
  images: string[];
  alt: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images, alt }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [initialLightboxSlide, setInitialLightboxSlide] = useState(0);
  const [lightboxSlide, setLightboxSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  const hasImages = images.length > 0;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // Mount detection for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Set the initial slide BEFORE opening
    setInitialLightboxSlide(currentSlide);
    setLightboxSlide(currentSlide);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isLightboxOpen]);

  // Empty state when no images available
  if (!hasImages) {
    return (
      <SliderContainer>
        <EmptyState>
          <EmptyStateText>Images coming soon</EmptyStateText>
        </EmptyState>
      </SliderContainer>
    );
  }

  return (
    <>
      <SliderContainer>
        <div ref={sliderRef} className="keen-slider">
          {images.map((src, idx) => (
            <div key={idx} className="keen-slider__slide">
              <SlideImage src={src} alt={`${alt} - slide ${idx + 1}`} fill />
            </div>
          ))}
        </div>

        <ExpandButton
          onClick={(e) => {
            e.stopPropagation();
            openLightbox(e);
          }}
          title="Expand image"
        >
          <Maximize2 />
        </ExpandButton>

        {loaded && instanceRef.current && images.length > 1 && (
          <>
            <Arrow
              $direction="left"
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
            >
              <ChevronLeft />
            </Arrow>
            <Arrow
              $direction="right"
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
            >
              <ChevronRight />
            </Arrow>

            <Dots>
              {images.map((_, idx) => (
                <Dot
                  key={idx}
                  $active={currentSlide === idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    instanceRef.current?.moveToIdx(idx);
                  }}
                />
              ))}
            </Dots>
          </>
        )}
      </SliderContainer>

      {/* Lightbox Modal - Rendered via Portal */}
      {mounted &&
        isLightboxOpen &&
        createPortal(
          <LightboxOverlay $isOpen={isLightboxOpen} onClick={closeLightbox}>
            <LightboxContent onClick={(e) => e.stopPropagation()}>
              <LightboxHeader>
                <LightboxTitle>{alt}</LightboxTitle>
                <LightboxClose onClick={closeLightbox} title="Close (Esc)">
                  <X />
                </LightboxClose>
              </LightboxHeader>

              <LightboxSliderContent
                images={images}
                alt={alt}
                initialSlide={initialLightboxSlide}
                onSlideChange={setLightboxSlide}
                currentSlide={lightboxSlide}
              />
            </LightboxContent>
          </LightboxOverlay>,
          document.body,
        )}
    </>
  );
};

// Separate component for lightbox slider to ensure clean initialization
interface LightboxSliderContentProps {
  images: string[];
  alt: string;
  initialSlide: number;
  onSlideChange: (slide: number) => void;
  currentSlide: number;
}

const LightboxSliderContent: React.FC<LightboxSliderContentProps> = ({
  images,
  alt,
  initialSlide,
  onSlideChange,
  currentSlide,
}) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: initialSlide,
    loop: true,
    renderMode: 'performance',
    slideChanged(slider) {
      onSlideChange(slider.track.details.rel);
    },
  });

  return (
    <LightboxSliderWrapper>
      <LightboxSliderContainer>
        <div ref={sliderRef} className="keen-slider">
          {images.map((src, idx) => (
            <div key={idx} className="keen-slider__slide">
              <LightboxImageWrapper>
                <LightboxImage
                  src={src}
                  alt={`${alt} - slide ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 80vw"
                  quality={95}
                  priority={idx === initialSlide}
                  loading={idx === initialSlide ? 'eager' : 'lazy'}
                />
              </LightboxImageWrapper>
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <LightboxArrow
              $direction="left"
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
            >
              <ChevronLeft />
            </LightboxArrow>
            <LightboxArrow
              $direction="right"
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
            >
              <ChevronRight />
            </LightboxArrow>
          </>
        )}
      </LightboxSliderContainer>

      {images.length > 1 && (
        <LightboxDots>
          {images.map((_, idx) => (
            <LightboxDot
              key={idx}
              $active={currentSlide === idx}
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.moveToIdx(idx);
              }}
            />
          ))}
        </LightboxDots>
      )}
    </LightboxSliderWrapper>
  );
};
