'use client';

import type { ReactNode } from 'react';
import { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { toPng } from 'html-to-image';

const ORANGE = '#ff6b35';
const INK = '#0a0a0a';
const WHITE = '#fafafa';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: 9999;
  padding: 28px;
  overflow: auto;
  gap: 20px;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 10;
  background: #0a0a0a;
  padding: 14px 18px;
  border-radius: 10px;
  border: 1px solid #27272a;
`;

const Button = styled.button`
  padding: 10px 14px;
  background: #ff6b35;
  color: #0a0a0a;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 650;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #ff8555;
  }

  &:disabled {
    background: #27272a;
    color: #71717a;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: #fafafa;
  border: 1px solid #27272a;

  &:hover {
    background: #111113;
  }
`;

const SizeSelect = styled.select`
  padding: 10px 12px;
  background: #111113;
  color: #fafafa;
  border: 1px solid #27272a;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
`;

const SelectedInfo = styled.span`
  font-size: 12px;
  color: #a1a1aa;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
`;

const Toggle = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #a1a1aa;
  font-family: system-ui, -apple-system, sans-serif;
  user-select: none;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #ff6b35;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 36px 26px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Preview = styled.button<{ $size: number; $selected?: boolean }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
  border-radius: 12px;
  outline: ${({ $selected }) => ($selected ? `3px solid ${ORANGE}` : '3px solid transparent')};
  outline-offset: 6px;
  transition: outline 0.15s ease;

  &:hover {
    outline-color: ${({ $selected }) => ($selected ? ORANGE : '#3f3f46')};
  }
`;

const Label = styled.span`
  position: absolute;
  bottom: -22px;
  font-size: 10px;
  color: #71717a;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

const Checkerboard = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(45deg, #1a1a1a 25%, transparent 25%),
    linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%),
    linear-gradient(-45deg, transparent 75%, #1a1a1a 75%);
  background-size: 16px 16px;
  background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  background-color: #0f0f10;
  border-radius: 10px;
  z-index: -1;
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  display: block;
  shape-rendering: geometricPrecision;
`;

type IconSpec = {
  id: string;
  label: string;
  render: () => ReactNode;
};

function makeIconSvg(children: ReactNode) {
  return (
    <Svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {children}
    </Svg>
  );
}

// Curated: built to survive 16px (thick strokes, no thin hairlines, minimal details)
const ICONS: IconSpec[] = [
  // Bracket family (modern, dev-adjacent)
  {
    id: 'corners-dot',
    label: 'Corners + Dot',
    render: () =>
      makeIconSvg(
        <>
          <path
            d="M144 196v-52h52 M368 144h-52 M368 196v-52 M144 316v52h52 M368 316v52h-52"
            fill="none"
            stroke={ORANGE}
            strokeWidth="44"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="256" cy="256" r="34" fill={WHITE} />
        </>,
      ),
  },
  {
    id: 'square-brackets',
    label: '[ ] Mark',
    render: () =>
      makeIconSvg(
        <>
          <path
            d="M176 160H148v192h28 M336 160h28v192h-28"
            fill="none"
            stroke={ORANGE}
            strokeWidth="46"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M228 256h56" fill="none" stroke={WHITE} strokeWidth="46" strokeLinecap="round" />
        </>,
      ),
  },
  {
    id: 'round-parens',
    label: '( ) Mark',
    render: () =>
      makeIconSvg(
        <>
          <path
            d="M192 156c-54 0-84 36-84 100v0c0 64 30 100 84 100"
            fill="none"
            stroke={ORANGE}
            strokeWidth="46"
            strokeLinecap="round"
          />
          <path
            d="M320 156c54 0 84 36 84 100v0c0 64-30 100-84 100"
            fill="none"
            stroke={ORANGE}
            strokeWidth="46"
            strokeLinecap="round"
          />
          <path d="M232 256h48" fill="none" stroke={WHITE} strokeWidth="46" strokeLinecap="round" />
        </>,
      ),
  },
  {
    id: 'angle-brackets',
    label: '< > Mark',
    render: () =>
      makeIconSvg(
        <>
          <path
            d="M216 168l-84 88 84 88"
            fill="none"
            stroke={ORANGE}
            strokeWidth="46"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M296 168l84 88-84 88"
            fill="none"
            stroke={ORANGE}
            strokeWidth="46"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="256" cy="256" r="26" fill={WHITE} />
        </>,
      ),
  },
  {
    id: 'brackets-double',
    label: '[[ ]]',
    render: () =>
      makeIconSvg(
        <>
          <path
            d="M176 160H152v192h24 M200 160h-18v192h18"
            fill="none"
            stroke={ORANGE}
            strokeWidth="40"
            strokeLinecap="round"
          />
          <path
            d="M336 160h24v192h-24 M312 160h18v192h-18"
            fill="none"
            stroke={ORANGE}
            strokeWidth="40"
            strokeLinecap="round"
          />
          <path d="M232 256h48" fill="none" stroke={WHITE} strokeWidth="44" strokeLinecap="round" />
        </>,
      ),
  },

  // Cut badge family (your direction, refined)
  {
    id: 'cut-solid',
    label: 'Cut Solid',
    render: () =>
      makeIconSvg(
        <>
          <path d="M112 112h288v288H174L112 338V112Z" fill={ORANGE} />
          <path d="M220 224h72M206 294h100" fill="none" stroke={INK} strokeWidth="44" strokeLinecap="round" />
        </>,
      ),
  },
  {
    id: 'cut-outline',
    label: 'Cut Outline',
    render: () =>
      makeIconSvg(
        <>
          <path
            d="M112 112h288v288H174L112 338V112Z"
            fill="none"
            stroke={ORANGE}
            strokeWidth="28"
            strokeLinejoin="round"
          />
          <path d="M232 256h48" fill="none" stroke={WHITE} strokeWidth="46" strokeLinecap="round" />
        </>,
      ),
  },
  {
    id: 'cut-minimal',
    label: 'Cut Minimal',
    render: () =>
      makeIconSvg(
        <>
          <path d="M140 140h232v232H206L140 306V140Z" fill={ORANGE} />
        </>,
      ),
  },

  // Premium frames (simple, brand-safe)
  {
    id: 'ring-dual',
    label: 'Dual Ring',
    render: () =>
      makeIconSvg(
        <>
          <circle cx="256" cy="256" r="176" fill="none" stroke={ORANGE} strokeWidth="28" />
          <circle cx="256" cy="256" r="128" fill="none" stroke={ORANGE} strokeWidth="14" opacity="0.45" />
          <path d="M232 256h48" fill="none" stroke={WHITE} strokeWidth="46" strokeLinecap="round" />
        </>,
      ),
  },
  {
    id: 'double-frame',
    label: 'Double Frame',
    render: () =>
      makeIconSvg(
        <>
          <rect x="110" y="110" width="292" height="292" rx="56" fill="none" stroke={ORANGE} strokeWidth="22" />
          <rect
            x="150"
            y="150"
            width="212"
            height="212"
            rx="44"
            fill="none"
            stroke={ORANGE}
            strokeWidth="12"
            opacity="0.5"
          />
          <path d="M232 256h48" fill="none" stroke={WHITE} strokeWidth="46" strokeLinecap="round" />
        </>,
      ),
  },
  {
    id: 'pill-cut',
    label: 'Pill Cut',
    render: () =>
      makeIconSvg(
        <>
          <path d="M136 176c0-22 18-40 40-40h160c22 0 40 18 40 40v160c0 22-18 40-40 40H206l-70-70V176Z" fill={ORANGE} />
          <path d="M236 232h40M224 300h64" fill="none" stroke={INK} strokeWidth="44" strokeLinecap="round" />
        </>,
      ),
  },

  // Ultra-minimal “premium” marks (works insanely well at 16px)
  {
    id: 'dot',
    label: 'Dot',
    render: () => makeIconSvg(<circle cx="256" cy="256" r="84" fill={ORANGE} />),
  },
  {
    id: 'bar',
    label: 'Bar',
    render: () =>
      makeIconSvg(<path d="M196 256h120" fill="none" stroke={ORANGE} strokeWidth="72" strokeLinecap="round" />),
  },
  {
    id: 'dot-bar',
    label: 'Dot + Bar',
    render: () =>
      makeIconSvg(
        <>
          <path d="M188 256h136" fill="none" stroke={ORANGE} strokeWidth="64" strokeLinecap="round" />
          <circle cx="356" cy="256" r="36" fill={WHITE} />
        </>,
      ),
  },
  {
    id: 'corner-mark',
    label: 'Corner Mark',
    render: () =>
      makeIconSvg(
        <>
          <path
            d="M176 176h-48v160h48 M336 176h48v160h-48"
            fill="none"
            stroke={ORANGE}
            strokeWidth="44"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>,
      ),
  },
];

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function mulberry32(seedInit: number) {
  let seed = seedInit | 0;
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const FaviconPreview = () => {
  const [selectedId, setSelectedId] = useState<string>(ICONS[0]?.id ?? 'corners-dot');
  const [exportSize, setExportSize] = useState<number>(512);
  const [downloading, setDownloading] = useState(false);
  const [showChecker, setShowChecker] = useState(true);
  const [shuffleSeed, setShuffleSeed] = useState(1);
  const exportRef = useRef<HTMLDivElement>(null);

  const orderedIcons = useMemo(() => shuffle(ICONS, mulberry32(shuffleSeed)), [shuffleSeed]);
  const selected = orderedIcons.find((i) => i.id === selectedId) ?? orderedIcons[0];

  const handleDownload = async () => {
    if (!exportRef.current || !selected) return;
    setDownloading(true);

    try {
      // Create canvas -> guarantees transparent PNG output.
      const canvas = document.createElement('canvas');
      canvas.width = exportSize;
      canvas.height = exportSize;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      ctx.clearRect(0, 0, exportSize, exportSize);

      const dataUrl = await toPng(exportRef.current, {
        width: exportSize,
        height: exportSize,
        pixelRatio: 1,
        cacheBust: true,
      });

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const finalDataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `favicon-${selected.id}-${exportSize}x${exportSize}.png`;
        link.href = finalDataUrl;
        link.click();
        setDownloading(false);
      };
      img.onerror = () => {
        const link = document.createElement('a');
        link.download = `favicon-${selected.id}-${exportSize}x${exportSize}.png`;
        link.href = dataUrl;
        link.click();
        setDownloading(false);
      };
      img.src = dataUrl;
    } catch (err) {
      console.error('Failed to export:', err);
      setDownloading(false);
    }
  };

  return (
    <Overlay>
      <Controls>
        <SelectedInfo>Selected: {selected?.label ?? '-'}</SelectedInfo>

        <SizeSelect value={exportSize} onChange={(e) => setExportSize(Number(e.target.value))}>
          <option value={16}>16×16</option>
          <option value={32}>32×32</option>
          <option value={64}>64×64</option>
          <option value={128}>128×128</option>
          <option value={256}>256×256</option>
          <option value={512}>512×512</option>
        </SizeSelect>

        <Toggle>
          <Checkbox type="checkbox" checked={showChecker} onChange={(e) => setShowChecker(e.target.checked)} />
          checkerboard
        </Toggle>

        <SecondaryButton type="button" onClick={() => setShuffleSeed((s) => s + 1)} disabled={downloading}>
          Shuffle
        </SecondaryButton>

        <Button type="button" onClick={handleDownload} disabled={downloading}>
          {downloading ? 'Exporting…' : 'Download PNG'}
        </Button>
      </Controls>

      <Grid>
        {orderedIcons.map((icon) => (
          <Preview
            key={icon.id}
            type="button"
            $size={120}
            $selected={selectedId === icon.id}
            onClick={() => setSelectedId(icon.id)}
          >
            {showChecker ? <Checkerboard /> : null}
            {icon.render()}
            <Label>{icon.label}</Label>
          </Preview>
        ))}
      </Grid>

      {/* Hidden export target (always transparent) */}
      <div style={{ position: 'absolute', left: -9999, top: -9999, background: 'transparent' }}>
        <div ref={exportRef} style={{ width: exportSize, height: exportSize, background: 'transparent' }}>
          {selected?.render()}
        </div>
      </div>
    </Overlay>
  );
};

export default FaviconPreview;
