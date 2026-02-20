import { CONSENTS } from '@/shared/config/consents';

export function buildInitialConsents() {
  return {
    terms: {
      acceptedAt: new Date(),
      version: CONSENTS.terms.version,
    },
    privacy: {
      acceptedAt: new Date(),
      version: CONSENTS.privacy.version,
    },
  };
}
