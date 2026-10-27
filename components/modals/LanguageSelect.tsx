import Image from 'next/image';

// biome-ignore lint/style/useImportType: <TODO>
import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import {
  BODY_MUTED,
  CARD_TITLE,
  LABEL,
  SURFACE,
} from '@/component/styles/typography';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}
interface LanguageSelectProps {
  onLanguageSelect: (code: string) => void;
  currentLanguage: string;
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  onLanguageSelect,
  currentLanguage,
}) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>(currentLanguage);

  const languages: Language[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '/flags/en.png',
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '/flags/zh.png',
    },
  ];

  const languageTitles: { [key: string]: string } = {
    en: 'Select your language',
    zh: '选择语言',
    // Add more languages here
  };

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    onLanguageSelect(code);
  };

  return (
    <div className="p-6 md:py-10 mx-4">
      <div className="flex justify-center pb-8">
        <h2 className={`${CARD_TITLE} inline-block m-0`}>
          {languageTitles[currentLanguage] || languageTitles.en}
        </h2>
      </div>
      <div className="grid lg:grid-cols-1 gap-3">
        {languages.map((language) => (
          <div
            key={language.code}
            className="flex justify-center w-full items-center h-full"
          >
            <div className="w-full max-w-md h-full">
              <button
                type="button"
                onClick={() => handleLanguageSelect(language.code)}
                className={`flex flex-row w-full h-full items-center justify-between rounded-lg border ${
                  selectedLanguage === language.code
                    ? `border-blue-500 ${SURFACE.info}`
                    : 'border-input bg-background'
                } p-4 shadow transition transform duration-200 hover:scale-105 hover:bg-muted focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring`}
              >
                <Image
                  src={language.flag}
                  alt={`${language.name} Flag`}
                  className="w-10 h-10 rounded-full mr-4"
                  width={40}
                  height={40}
                />
                <div className="grow text-left">
                  <div className={LABEL}>{language.name}</div>
                  <div className={BODY_MUTED}>{language.nativeName}</div>
                </div>
                <div className="shrink-0">
                  <FaChevronRight className="h-6 w-6 text-muted-foreground" />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
