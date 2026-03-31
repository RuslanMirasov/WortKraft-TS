'use client';

import { useTranslations } from 'next-intl';
import { Title, Text, Button } from '@/components';
import { usePopup } from '@/stores/popup-store';

export default function Home() {
  const t = useTranslations('navigation');
  const openPopup = usePopup(state => state.openPopup);
  return (
    <section>
      <div className="container">
        <Title tag="h1" size="h1">
          Wählen Sie ein Buch
        </Title>
        <Text light size="small">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi aspernatur aliquid, amet illo corporis
          doloremque laboriosam sit possimus. Quam, quidem accusamus iusto in delectus praesentium laboriosam maxime
          odit ipsam tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi aspernatur aliquid, amet
          illo corporis doloremque laboriosam sit possimus. Quam, quidem accusamus iusto in delectus praesentium
          laboriosam maxime odit ipsam tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          aspernatur aliquid, amet illo corporis doloremque laboriosam sit possimus. Quam, quidem accusamus iusto in
          delectus praesentium laboriosam maxime odit ipsam tempora. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Commodi aspernatur aliquid, amet illo corporis doloremque laboriosam sit possimus. Quam, quidem
          accusamus iusto in delectus praesentium laboriosam maxime odit ipsam tempora. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Commodi aspernatur aliquid, amet illo corporis doloremque laboriosam sit
          possimus. Quam, quidem accusamus iusto in delectus praesentium laboriosam maxime odit ipsam tempora. Lorem
        </Text>
        <Title tag="h2" size="h2">
          Some title
        </Title>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi aspernatur aliquid, amet illo corporis
          doloremque laboriosam sit possimus. Quam, quidem accusamus iusto in delectus praesentium laboriosam maxime
          odit ipsam tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi aspernatur aliquid, amet
          illo corporis doloremque laboriosam sit possimus. Quam, quidem accusamus iusto in delectus praesentium
          laboriosam maxime odit ipsam tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
        </Text>
        <div>
          <Button size="small" onClick={() => openPopup('download')} icon="arrow-right">
            Download
          </Button>
        </div>
      </div>
    </section>
  );
}
