declare module "next-intl/routing" {
  export function defineRouting(config: {
    locales: string[];
    defaultLocale: string;
  }): {
    locales: string[];
    defaultLocale: string;
  };
}
