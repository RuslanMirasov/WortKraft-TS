"use client";

import { useState } from "react";
import { Icon } from "../../components";
import css from "./LanguageSwitcher.module.scss";

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("de");

  const switchLanguage = (language: string) => {
    setLanguage(language);
    setOpen(false);
  };

  return (
    <div className={css.LanguageSwitcher}>
      <div
        className={css.Select}
        onClick={() => setOpen((prev) => (prev ? false : true))}
      >
        <Icon name={language} />
        {language === "de" && <span>Deutsch</span>}
        {language === "en" && <span>English</span>}
        {language === "uk" && <span>Українська</span>}

        <div className={css.Arrow}>
          <Icon name="arrow" />
        </div>
      </div>

      {open && (
        <ul className={css.List}>
          <li>
            <div className={css.Select} onClick={() => switchLanguage("de")}>
              <Icon name="de" />
              <span>Deutsch</span>
            </div>
          </li>
          <li>
            <div className={css.Select} onClick={() => switchLanguage("en")}>
              <Icon name="en" />
              <span>English</span>
            </div>
          </li>
          <li>
            <div className={css.Select} onClick={() => switchLanguage("uk")}>
              <Icon name="uk" />
              <span>Українська</span>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
