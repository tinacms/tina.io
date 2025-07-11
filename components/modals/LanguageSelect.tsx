import Image from 'next/image';
import type React from 'react';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

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
    <div className="py-10">
      <div className="flex justify-center pb-8">
        <h1 className="inline-block m-0 min-[640px]:text-3xl min-[540px]:text-2xl lg:leading-tight bg-linear-to-br from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
          {languageTitles[currentLanguage] || languageTitles.en}
        </h1>
      </div>
      <div className="grid lg:grid-cols-1 gap-3 px-6 md:px-0 lg:px-6">
        {languages.map((language) => (
          <div
            key={language.code}
            className="flex justify-center w-full items-center h-full"
          >
            <div className="w-full max-w-md h-full">
              <button
                onClick={() => handleLanguageSelect(language.code)}
                className={`flex flex-row w-full h-full items-center justify-between rounded-lg border ${
                  selectedLanguage === language.code
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-input bg-background'
                } p-4 shadow transition transform duration-200 hover:scale-105 hover:bg-muted focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring text-blue-800 hover:text-blue-700`}
              >
                <Image
                  src={language.flag}
                  alt={`${language.name} Flag`}
                  className="w-10 h-10 rounded-full mr-4"
                  width={40}
                  height={40}
                />
                <div className="grow text-left">
                  <div className="font-medium text-lg">{language.name}</div>
                  <div className="text-muted-foreground text-xs">
                    {language.nativeName}
                  </div>
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
