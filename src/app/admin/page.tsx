import { GenerateWordForm, GoBack, Hero, Title } from '@/components';

export default function AdminPage() {
  return (
    <div className="container">
      <Hero>
        <GoBack />
        <Title tag="h1" size="h1">
          CMS-ка
        </Title>
      </Hero>

      <GenerateWordForm />
    </div>
  );
}
