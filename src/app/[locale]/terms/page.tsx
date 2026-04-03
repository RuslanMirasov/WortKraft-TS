import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components';

export default function TermsPage() {
  const t = useTranslations('navigation');

  return (
    <div className="container mini">
      <Title tag="h1" size="h1">
        Terms
      </Title>
      <hr />
      <Text color="grey" size="small">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, magnam voluptas, vel soluta odio modi itaque
        voluptatum reprehenderit ad error veniam nisi veritatis inventore est nobis temporibus in accusantium! Tempora!
      </Text>
      <Text color="grey" size="small">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, magnam voluptas, vel soluta odio modi itaque
        voluptatum reprehenderit ad error veniam nisi veritatis inventore est nobis temporibus in accusantium! Tempora!
      </Text>
      <Text color="grey" size="small">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, magnam voluptas, vel soluta odio modi itaque
        voluptatum reprehenderit ad error veniam nisi veritatis inventore est nobis temporibus in accusantium! Tempora!
      </Text>
      <Title tag="h2" size="h5">
        Some title
      </Title>
      <Text color="grey" size="small">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, magnam voluptas, vel soluta odio modi itaque
        voluptatum reprehenderit ad error veniam nisi veritatis inventore est nobis temporibus in accusantium! Tempora!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, magnam voluptas, vel soluta odio modi itaque
        voluptatum reprehenderit ad error veniam nisi veritatis inventore est nobis temporibus in accusantium! Tempora!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, magnam voluptas, vel soluta odio modi itaque
        voluptatum reprehenderit ad error veniam nisi veritatis inventore est nobis temporibus in accusantium! Tempora!
      </Text>
      <Text color="grey" size="small">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, magnam voluptas, vel soluta odio modi itaque
        voluptatum reprehenderit ad error veniam nisi veritatis inventore est nobis temporibus in accusantium! Tempora!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, magnam voluptas, vel soluta odio modi itaque
        voluptatum reprehenderit ad error veniam nisi veritatis inventore est nobis temporibus in accusantium! Tempora!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, magnam voluptas, vel soluta odio modi itaque
        voluptatum reprehenderit ad error veniam nisi veritatis inventore est nobis temporibus in accusantium! Tempora!
      </Text>
    </div>
  );
}
