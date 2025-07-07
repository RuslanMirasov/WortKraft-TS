declare module "next-intl/middleware" {
  import type {
    NextRequest,
    NextFetchEvent,
    NextMiddleware,
  } from "next/server";

  interface IntlMiddlewareConfig {
    locales: string[];
    defaultLocale: string;
  }

  export default function createMiddleware(
    config: IntlMiddlewareConfig
  ): (
    request: NextRequest,
    event: NextFetchEvent
  ) => ReturnType<NextMiddleware>;
}
