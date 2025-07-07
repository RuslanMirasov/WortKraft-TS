import { useTranslations } from "next-intl";
import { Icon, Title } from "./../components";

export default function Home() {
  const t = useTranslations("navigation");
  return (
    <>
      <button style={{ display: "block", margin: "0 auto" }}>
        {t("bookmarks")}
      </button>
    </>
  );
}
