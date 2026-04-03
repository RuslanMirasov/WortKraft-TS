import Title from '@/components/Title/Title';
import Text from '@/components/Text/Text';

const PolicyEn = () => {
  return (
    <>
      <Title tag="h1" size="h1">
        Privacy Policy
      </Title>

      <Text color="grey" size="small">
        This Privacy Policy explains how personal data is processed when you use WortKraft. It is intended in particular
        to meet the information obligations under Articles 13 and 14 GDPR.
      </Text>

      <Title tag="h2" size="h5">
        1. Controller
      </Title>
      <Text color="grey" size="small">
        The controller responsible for processing personal data is:
      </Text>
      <Text color="grey" size="small">
        [Name / Company]
        <br />
        [Street, Number]
        <br />
        [Postal Code, City]
        <br />
        [Email]
      </Text>

      <Title tag="h2" size="h5">
        2. Data Protection Officer
      </Title>
      <Text color="grey" size="small">
        Where legally required, you can contact the data protection officer at:
      </Text>
      <Text color="grey" size="small">
        [Name of Data Protection Officer]
        <br />
        [Contact Address]
        <br />
        [Email]
      </Text>

      <Title tag="h2" size="h5">
        3. Purposes, categories of data, and legal bases
      </Title>
      <Text color="grey" size="small">
        We process personal data only insofar as this is necessary to operate the application. In particular, this
        includes the following processing activities:
      </Text>
      <Text color="grey" size="small">
        Account registration and login: processing of email address, password hash, name, and technical login data to
        create and protect your user account. Legal basis: Article 6(1)(b) GDPR.
      </Text>
      <Text color="grey" size="small">
        Sign-in via Google: if you sign in with Google, we process profile data transmitted by Google, in particular
        your email address, name, profile image, and provider-specific identifier. Where such data is not collected
        directly from you, this notice also serves to provide information under Article 14 GDPR. Legal basis: Article
        6(1)(b) GDPR.
      </Text>
      <Text color="grey" size="small">
        Learning progress and account settings: processing of language settings, account settings, and user-related
        progress data so that the features requested by you can be provided. Legal basis: Article 6(1)(b) GDPR.
      </Text>
      <Text color="grey" size="small">
        Security and abuse prevention: processing of technical information such as IP-related login data, timestamps,
        and blocking information to detect abusive login attempts and protect the application. Legal basis: Article
        6(1)(f) GDPR. Our legitimate interest is the protection of the service, user accounts, and system integrity.
      </Text>

      <Title tag="h2" size="h5">
        4. Device access, local storage, cookies, and offline features
      </Title>
      <Text color="grey" size="small">
        The application may store information on your device or access information already stored there, for example for
        login states, local settings, PWA installation prompts, or offline features via a service worker. Where such
        access is strictly necessary, it is based on Section 25(2) No. 2 TDDDG. If non-essential technologies are
        introduced in the future, they will only be used on the basis of separate consent.
      </Text>

      <Title tag="h2" size="h5">
        5. Recipients or categories of recipients
      </Title>
      <Text color="grey" size="small">
        Personal data is disclosed only to recipients where this is necessary to operate the application. This may
        include hosting and infrastructure providers, database providers, and Google as an authentication provider.
        Further disclosure takes place only where there is a legal obligation or where you have given consent.
      </Text>

      <Title tag="h2" size="h5">
        6. International transfers
      </Title>
      <Text color="grey" size="small">
        Where external providers process data in countries outside the European Union or the European Economic Area,
        this is done only in compliance with Articles 44 et seq. GDPR. Please complete this section with the actual
        providers used and the transfer mechanisms applied, for example adequacy decisions or standard contractual
        clauses.
      </Text>

      <Title tag="h2" size="h5">
        7. Retention period
      </Title>
      <Text color="grey" size="small">
        We store personal data only as long as necessary for the stated purposes or as long as legal retention
        obligations apply. Account data is generally stored for as long as the user account remains active. Security and
        log data is retained only as long as required to prevent abuse and analyze errors.
      </Text>

      <Title tag="h2" size="h5">
        8. Requirement to provide data
      </Title>
      <Text color="grey" size="small">
        Providing certain data is necessary to create and use an account. Without the required information, in
        particular your email address and authentication data, the application cannot be used or can only be used to a
        limited extent.
      </Text>

      <Title tag="h2" size="h5">
        9. Your rights
      </Title>
      <Text color="grey" size="small">
        Under the GDPR, you have the right of access, rectification, erasure, restriction of processing, data
        portability, and objection to processing based on legitimate interests. You may withdraw any consent you have
        given at any time with effect for the future.
      </Text>

      <Title tag="h2" size="h5">
        10. Right to lodge a complaint
      </Title>
      <Text color="grey" size="small">
        You have the right to lodge a complaint with a data protection supervisory authority, in particular in the
        Member State of your habitual residence, place of work, or the place of the alleged infringement.
      </Text>

      <Title tag="h2" size="h5">
        11. Automated decision-making
      </Title>
      <Text color="grey" size="small">
        At present, no automated decision-making, including profiling within the meaning of Article 22 GDPR, takes
        place.
      </Text>

      <Title tag="h2" size="h5">
        12. Changes to this Privacy Policy
      </Title>
      <Text color="grey" size="small">
        This Privacy Policy may be updated if the application, the services used, or legal requirements change. The
        current version published on this page applies.
      </Text>
    </>
  );
};

export default PolicyEn;
