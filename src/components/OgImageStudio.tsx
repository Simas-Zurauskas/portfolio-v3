'use client';

import { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { toPng } from 'html-to-image';
import { COUNT_CLIENTS, COUNT_PROJECTS, COUNT_YEARS } from '@/conf';

// OG recommendations:
// - Open Graph: 1200x630 (1.91:1)
// - Twitter summary_large_image: 1200x628 (close enough: 1200x630 works widely)
const OG_W = 1200;
const OG_H = 630;

type VariantId = 'hero' | 'work' | 'capabilities' | 'code' | 'certificate';

type VariantSpec = {
  id: VariantId;
  label: string;
  subtitle: string;
};

const VARIANTS: VariantSpec[] = [
  { id: 'hero', label: 'Simple Intro', subtitle: 'Name + what I do' },
  { id: 'work', label: 'Track Record', subtitle: 'Results speak' },
  { id: 'capabilities', label: 'What I Build', subtitle: 'Core services' },
  { id: 'code', label: 'Tech Stack', subtitle: 'Tools I use' },
  { id: 'certificate', label: 'AI Credential', subtitle: 'Proof of expertise' },
];

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #030712;
  z-index: 9999;
  overflow: auto;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Controls = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background: #030712;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

const Label = styled.span`
  font-size: 12px;
  color: #94a3b8;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
`;

const Select = styled.select`
  padding: 10px 12px;
  background: #0f172a;
  color: #f1f5f9;
  border: 1px solid #1e293b;
  border-radius: 10px;
  font-size: 13px;
`;

const Button = styled.button<{ $secondary?: boolean }>`
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 650;
  cursor: pointer;
  border: 1px solid ${({ $secondary }) => ($secondary ? '#1e293b' : '#ff6b35')};
  background: ${({ $secondary }) => ($secondary ? 'transparent' : '#ff6b35')};
  color: ${({ $secondary }) => ($secondary ? '#f1f5f9' : '#030712')};
  transition: all 0.15s ease;

  &:hover {
    background: ${({ $secondary }) => ($secondary ? '#0b1220' : '#ff8a5c')};
    border-color: ${({ $secondary }) => ($secondary ? '#334155' : '#ff8a5c')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 900px;
`;

const Card = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ $active }) => ($active ? '#ff6b35' : '#1e293b')};
  background: rgba(15, 23, 42, 0.35);
  border-radius: 14px;
  padding: 14px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ $active }) => ($active ? '#ff6b35' : '#334155')};
    background: rgba(15, 23, 42, 0.5);
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 10px;
`;

const CardTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #f1f5f9;
`;

const CardSub = styled.div`
  font-size: 12px;
  color: #94a3b8;
`;

const PreviewWrap = styled.div`
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #1e293b;
  background: #030712;
`;

const PreviewScaled = styled.div`
  width: ${OG_W}px;
  height: ${OG_H}px;
  transform-origin: top left;
  transform: scale(0.5);
`;

// Shared OG frame styles
const OgFrame = styled.div<{ $w: number; $h: number }>`
  width: ${({ $w }) => $w}px;
  height: ${({ $h }) => $h}px;
  position: relative;
  overflow: hidden;
  background: #030712;
  color: #f1f5f9;
  font-family: var(--font-geist-sans), system-ui, sans-serif;
`;

const Noise = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.04;
  pointer-events: none;
`;

const GridLines = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0.18;
  pointer-events: none;
`;

const Spotlight = styled.div`
  position: absolute;
  width: 900px;
  height: 900px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.18) 0%, rgba(255, 107, 53, 0.06) 35%, transparent 65%);
  filter: blur(55px);
  left: -180px;
  top: -220px;
  pointer-events: none;
`;

const AccentPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid #1e293b;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 14px;
  color: #94a3b8;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  background: #ff6b35;
  border-radius: 50%;
  display: inline-block;
`;

const H1 = styled.div`
  font-size: 66px;
  line-height: 1.04;
  font-weight: 800;
  letter-spacing: -0.04em;
`;

const H2 = styled.div`
  font-size: 22px;
  color: #94a3b8;
  line-height: 1.35;
  max-width: 820px;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Chip = styled.div`
  padding: 10px 12px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid #1e293b;
  color: #f1f5f9;
  font-size: 14px;
  font-weight: 650;
`;

const ChipAccent = styled(Chip)`
  border-color: rgba(255, 107, 53, 0.55);
  background: rgba(255, 107, 53, 0.12);
  color: #ff8a5c;
`;

const FooterBar = styled.div`
  position: absolute;
  left: 52px;
  right: 52px;
  bottom: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding-top: 18px;
  border-top: 1px solid #1e293b;
`;

const MetricRow = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  flex-wrap: wrap;
`;

const Metric = styled.div`
  display: flex;
  gap: 10px;
  align-items: baseline;
`;

const MetricNum = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: #f1f5f9;
`;

const MetricLabel = styled.span`
  font-size: 14px;
  color: #94a3b8;
`;

const Url = styled.div`
  font-size: 14px;
  color: #94a3b8;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
`;

function OgVariant({ id, w, h }: { id: VariantId; w: number; h: number }) {
  return (
    <OgFrame $w={w} $h={h}>
      <Spotlight />
      <GridLines />
      <Noise />

      {id === 'hero' ? (
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '54px 52px 0',
            minHeight: h,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1, maxHeight: h - 160, overflow: 'hidden' }}>
            <AccentPill>
              <Dot />
              <span>Software Engineer</span>
            </AccentPill>

            <div style={{ height: 36 }} />
            <H1 style={{ fontSize: 76 }}>Simas Žurauskas</H1>
            <div style={{ height: 22 }} />
            <H2 style={{ maxWidth: 900 }}>
              Building web applications, mobile products, and AI workflows. Modern stack, clean code, reliable delivery.
            </H2>
          </div>

          <FooterBar>
            <MetricRow>
              <Metric>
                <MetricNum>{COUNT_YEARS}+</MetricNum>
                <MetricLabel>Years</MetricLabel>
              </Metric>
              <Metric>
                <MetricNum>{COUNT_PROJECTS}+</MetricNum>
                <MetricLabel>Projects</MetricLabel>
              </Metric>
              <Metric>
                <MetricNum>{COUNT_CLIENTS}+</MetricNum>
                <MetricLabel>Clients</MetricLabel>
              </Metric>
            </MetricRow>
            <Url>simaszurauskas.com</Url>
          </FooterBar>
        </div>
      ) : null}

      {id === 'capabilities' ? (
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '54px 52px 0',
            minHeight: h,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1, maxHeight: h - 160, overflow: 'hidden' }}>
            <AccentPill>
              <Dot />
              <span>What I build</span>
            </AccentPill>

            <div style={{ height: 32 }} />
            <H1 style={{ fontSize: 68 }}>
              Web. Mobile. <span style={{ color: '#ff8a5c' }}>AI</span>.
            </H1>
            <div style={{ height: 22 }} />
            <H2 style={{ maxWidth: 900 }}>
              Full-stack applications, cross-platform mobile products, and AI-powered workflows — from concept to
              production.
            </H2>

            <div style={{ height: 32 }} />
            <Chips>
              <ChipAccent>Next.js</ChipAccent>
              <Chip>React Native</Chip>
              <ChipAccent>LangGraph</ChipAccent>
              <Chip>TypeScript</Chip>
              <Chip>GraphQL</Chip>
            </Chips>
          </div>

          <FooterBar>
            <MetricRow>
              <Metric>
                <MetricNum>Simas Žurauskas</MetricNum>
                <MetricLabel>· Software Engineer</MetricLabel>
              </Metric>
            </MetricRow>
            <Url>simaszurauskas.com</Url>
          </FooterBar>
        </div>
      ) : null}

      {id === 'work' ? (
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '54px 52px 0',
            minHeight: h,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1, maxHeight: h - 160, overflow: 'hidden' }}>
            <AccentPill>
              <Dot />
              <span>Track record</span>
            </AccentPill>

            <div style={{ height: 32 }} />
            <H1 style={{ fontSize: 72 }}>
              <span style={{ color: '#ff8a5c' }}>40+</span> projects delivered.
            </H1>
            <div style={{ height: 22 }} />
            <H2 style={{ maxWidth: 900 }}>
              Proven results across EdTech, FinTech, HealthTech, and SaaS — from MVP to scale.
            </H2>

            <div style={{ height: 32 }} />
            <Chips>
              <ChipAccent>25+ Web Apps</ChipAccent>
              <Chip>8+ Mobile Apps</Chip>
              <ChipAccent>6+ AI Products</ChipAccent>
              <Chip>15+ Clients</Chip>
            </Chips>
          </div>

          <FooterBar>
            <MetricRow>
              <Metric>
                <MetricNum>Simas Žurauskas</MetricNum>
                <MetricLabel>· Software Engineer</MetricLabel>
              </Metric>
            </MetricRow>
            <Url>simaszurauskas.com</Url>
          </FooterBar>
        </div>
      ) : null}

      {id === 'code' ? (
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '54px 52px 0',
            minHeight: h,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1, maxHeight: h - 160, overflow: 'hidden' }}>
            <AccentPill>
              <Dot />
              <span>Tech stack</span>
            </AccentPill>

            <div style={{ height: 32 }} />
            <H1 style={{ fontSize: 72 }}>
              Modern <span style={{ color: '#ff8a5c' }}>tools</span>. Proven{' '}
              <span style={{ color: '#ff8a5c' }}>results</span>.
            </H1>
            <div style={{ height: 22 }} />
            <H2 style={{ maxWidth: 900 }}>
              Next.js, React Native, TypeScript, LangGraph — production-grade stack that scales.
            </H2>

            <div style={{ height: 32 }} />
            <Chips>
              <ChipAccent>Next.js</ChipAccent>
              <ChipAccent>TypeScript</ChipAccent>
              <Chip>React Native</Chip>
              <ChipAccent>LangGraph</ChipAccent>
              <Chip>GraphQL</Chip>
              <Chip>MongoDB</Chip>
            </Chips>
          </div>

          <FooterBar>
            <MetricRow>
              <Metric>
                <MetricNum>Simas Žurauskas</MetricNum>
                <MetricLabel>· Software Engineer</MetricLabel>
              </Metric>
            </MetricRow>
            <Url>simaszurauskas.com</Url>
          </FooterBar>
        </div>
      ) : null}

      {id === 'certificate' ? (
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '54px 52px 0',
            minHeight: h,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1, maxHeight: h - 160, overflow: 'hidden' }}>
            <AccentPill>
              <Dot />
              <span>Credential</span>
            </AccentPill>

            <div style={{ height: 32 }} />
            <H1 style={{ fontSize: 68 }}>
              Certified <span style={{ color: '#ff8a5c' }}>AI Engineer</span>.
            </H1>
            <div style={{ height: 22 }} />
            <H2 style={{ maxWidth: 900 }}>
              200+ hours of training in LangGraph agents, RAG systems, and AI product integration — from Turing College.
            </H2>

            <div style={{ height: 32 }} />
            <Chips>
              <ChipAccent>LangGraph Agents</ChipAccent>
              <Chip>RAG Systems</Chip>
              <ChipAccent>OpenAI</ChipAccent>
              <Chip>Pinecone</Chip>
              <Chip>Automation</Chip>
            </Chips>
          </div>

          <FooterBar>
            <MetricRow>
              <Metric>
                <MetricNum>Simas Žurauskas</MetricNum>
                <MetricLabel>· Software Engineer</MetricLabel>
              </Metric>
            </MetricRow>
            <Url>simaszurauskas.com</Url>
          </FooterBar>
        </div>
      ) : null}
    </OgFrame>
  );
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

function shuffle<T>(arr: T[], rng: () => number) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const OgImageStudio = () => {
  const [selected, setSelected] = useState<VariantId>('hero');
  const [downloading, setDownloading] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(1);
  const [exportPreset, setExportPreset] = useState<'og' | 'retina'>('og');

  const pixelRatio = exportPreset === 'og' ? 1 : 2;
  const outW = OG_W * pixelRatio;
  const outH = OG_H * pixelRatio;

  const ordered = useMemo(() => shuffle(VARIANTS, mulberry32(shuffleSeed)), [shuffleSeed]);
  const refs = useRef<Record<VariantId, HTMLDivElement | null>>({
    hero: null,
    work: null,
    capabilities: null,
    code: null,
    certificate: null,
  });

  const downloadOne = async (id: VariantId) => {
    const node = refs.current[id];
    if (!node) return;
    const file = `og-${id}-${outW}x${outH}.png`;

    const dataUrl = await toPng(node, {
      width: OG_W,
      height: OG_H,
      pixelRatio,
      cacheBust: true,
      backgroundColor: '#030712',
    });

    const link = document.createElement('a');
    link.download = file;
    link.href = dataUrl;
    link.click();
  };

  const downloadAll = async () => {
    setDownloading(true);
    try {
      // sequential to avoid memory spikes
      for (const v of VARIANTS) {
        await downloadOne(v.id);

        await new Promise((r) => setTimeout(r, 200));
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Overlay>
      <Controls>
        <Label>OG recommended:</Label>
        <Label style={{ color: '#f1f5f9' }}>1200×630</Label>

        <Label style={{ marginLeft: 8 }}>Export:</Label>
        <Select value={exportPreset} onChange={(e) => setExportPreset(e.target.value as 'og' | 'retina')}>
          <option value="og">1200×630</option>
          <option value="retina">Retina (2×)</option>
        </Select>

        <Label style={{ marginLeft: 8 }}>Selected:</Label>
        <Select value={selected} onChange={(e) => setSelected(e.target.value as VariantId)}>
          {VARIANTS.map((v) => (
            <option key={v.id} value={v.id}>
              {v.label}
            </option>
          ))}
        </Select>

        <Button $secondary type="button" onClick={() => setShuffleSeed((s) => s + 1)} disabled={downloading}>
          Shuffle
        </Button>

        <Button type="button" onClick={() => downloadOne(selected)} disabled={downloading}>
          {downloading ? 'Working…' : 'Download selected'}
        </Button>

        <Button type="button" onClick={downloadAll} disabled={downloading}>
          Download all (5)
        </Button>
      </Controls>

      <Grid>
        {ordered.map((v) => (
          <Card key={v.id} $active={selected === v.id} type="button" onClick={() => setSelected(v.id)}>
            <CardTop>
              <div>
                <CardTitle>{v.label}</CardTitle>
                <CardSub>{v.subtitle}</CardSub>
              </div>
              <CardSub>{selected === v.id ? 'Selected' : 'Click'}</CardSub>
            </CardTop>
            <PreviewWrap>
              {/* Scale down for preview, render at native OG size for accurate typography */}
              <div style={{ width: '100%', aspectRatio: `${OG_W}/${OG_H}` }}>
                <PreviewScaled style={{ transform: `scale(${Math.min(1, 520 / OG_W)})` }}>
                  <OgVariant id={v.id} w={OG_W} h={OG_H} />
                </PreviewScaled>
              </div>
            </PreviewWrap>
          </Card>
        ))}
      </Grid>

      {/* Hidden export targets (exact export size) */}
      <div style={{ position: 'absolute', left: -99999, top: -99999 }}>
        {VARIANTS.map((v) => (
          <div
            key={v.id}
            ref={(el) => {
              refs.current[v.id] = el;
            }}
          >
            <OgVariant id={v.id} w={OG_W} h={OG_H} />
          </div>
        ))}
      </div>
    </Overlay>
  );
};

export default OgImageStudio;
