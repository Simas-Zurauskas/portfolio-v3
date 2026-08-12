import { notFound } from 'next/navigation';
import { CVPageClient } from './comps/CVPageClient';

const isEnabled = process.env.NODE_ENV === 'development' || process.env.CV_ENABLED === 'true';

export default function CVPage() {
  if (!isEnabled) notFound();
  return <CVPageClient />;
}
