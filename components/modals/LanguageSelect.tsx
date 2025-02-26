import Image from 'next/image';
import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const LanguageSelect = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const languages: Language[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '/img/flags/en.png',
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '/img/flags/zh.png',
    },
  ];

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    // Here you would implement your language change logic
    // For example: i18n.changeLanguage(code);
  };

  return (
    <>
      <div className="py-10">
        <div className="flex justify-center pb-8">
          <h1 className="inline-block m-0 md:text-4xl font-tuner lg:text-3xl md:text-2xl lg:leading-tight bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Select your language
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
                  } p-4 shadow transition transform duration-200 hover:scale-105 hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-blue-800 hover:text-blue-700`}
                >
                  <Image
                    src={language.flag}
                    alt={`${language.name} Flag`}
                    className="w-10 h-10 rounded-full mr-4"
                    width={40}
                    height={40}
                  />
                  <div className="flex-grow text-left">
                    <div className="font-medium text-lg">{language.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {language.nativeName}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <FaChevronRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LanguageSelect;
