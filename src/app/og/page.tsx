import { notFound } from 'next/navigation';
import { OgImageStudio } from '@/components/OgImageStudio';

const isDev = process.env.NODE_ENV === 'development';

export default function OgPage() {
  if (!isDev) notFound();
  return <OgImageStudio />;
}
