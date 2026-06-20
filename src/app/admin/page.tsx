import { GoBack, Hero, Title } from '@/components';

export default function AdminPage() {
  return (
    <div className="container">
      <Hero>
        <GoBack />
        <Title tag="h1" size="h1">
          Admin Panel
        </Title>
      </Hero>
    </div>
  );
}
