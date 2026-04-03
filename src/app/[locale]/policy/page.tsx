import { PolicyDe, PolicyEn, PolicyUk } from '@/components';

export default async function PolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="container mini">
      {locale === 'en' && <PolicyEn />}
      {locale === 'uk' && <PolicyUk />}
      {locale === 'de' && <PolicyDe />}
    </div>
  );
}
