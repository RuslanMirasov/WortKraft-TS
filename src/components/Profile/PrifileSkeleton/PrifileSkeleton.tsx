import { Title, Hero, GoBack, Avatar } from '@/components';

const PrifileSkeleton = () => {
  return (
    <Hero>
      <GoBack />
      <Title tag="h1" size="h1">
        Hello
        <br />
        ...
      </Title>
      <Avatar email="" size="big" isLoading={true} />
    </Hero>
  );
};

export default PrifileSkeleton;
