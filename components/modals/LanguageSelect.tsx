// biome-ignore lint/style/useImportType: <TODO>
import React, { useState } from 'react';
import { CARD_TITLE } from '@/component/styles/typography';
import { ChooserCard } from '@/component/ui/ChooserCard';

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
    <div className="py-6 sm:mx-4 sm:px-6 md:py-10">
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
              <ChooserCard
                onClick={() => handleLanguageSelect(language.code)}
                name={language.name}
                description={language.nativeName}
                image={{
                  src: language.flag,
                  alt: `${language.name} Flag`,
                  kind: 'flag',
                }}
                selected={selectedLanguage === language.code}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
