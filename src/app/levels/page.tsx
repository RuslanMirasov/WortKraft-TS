import { getLevels } from '@/shared/lib/data';
import { Levels } from '@/components';

export default async function Home() {
  const levels = await getLevels();

  return (
    <section>
      <div className="container">
        <Levels levels={levels} />
      </div>
    </section>
  );
}
