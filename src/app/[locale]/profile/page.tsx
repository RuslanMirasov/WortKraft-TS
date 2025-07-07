import { useTranslations } from "next-intl";
import { Title } from "./../../components";

export default function Profile() {
  const t = useTranslations("navigation");
  return (
    <>
      <Title tag="h1" size="h1">
        Profile
      </Title>
    </>
  );
}
