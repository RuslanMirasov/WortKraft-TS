import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? headersList.get('referer') ?? '';
  const match = pathname.match(/^\/(de|en|uk)(\/|$)/);

  const locale = match?.[1] ?? 'de';

  redirect(`/${locale}/404`);
}
