import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLocaleFromPathname } from '@/shared/config/routes';

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? headersList.get('referer') ?? '';
  const locale = getLocaleFromPathname(pathname) ?? 'de';

  redirect(`/${locale}/404`);
}
