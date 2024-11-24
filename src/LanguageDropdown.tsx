import React, { useState } from 'react';
import { LanguageEnum } from './backend';

// Интерфейс для языка
export interface Language {
  code: LanguageEnum;
  name: string;
  flag: string;
}

// Массив языков с флагами и именами
export const languages: Language[] = [
  { code: LanguageEnum.English, name: 'English', flag: 'https://flagpedia.net/data/flags/h80/us.png' },
  { code: LanguageEnum.Chinese, name: '中文', flag: 'https://flagpedia.net/data/flags/h80/cn.png' },
  { code: LanguageEnum.Espanol, name: 'Español', flag: 'https://flagpedia.net/data/flags/h80/es.png' },
  { code: LanguageEnum.Deutsch, name: 'Deutsch', flag: 'https://flagpedia.net/data/flags/h80/de.png' },
  { code: LanguageEnum.French, name: 'Français', flag: 'https://flagpedia.net/data/flags/h80/fr.png' },
  { code: LanguageEnum.Japanese, name: '日本語', flag: 'https://flagpedia.net/data/flags/h80/jp.png' },
  { code: LanguageEnum.Russian, name: 'Русский', flag: 'https://flagpedia.net/data/flags/h80/ru.png' },
];

export default function LanguageDropdown(props: { defaultLanguage: Language, onSelectedNewLanguage: (newLang: Language) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (language: Language) => {
    props.onSelectedNewLanguage(language)
    setIsOpen(false); // Закрыть dropdown после выбора
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        type="button"
        className="p-2 inline-flex justify-center w-full rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        {/* Показываем флаг и название выбранного языка */}
        <img src={props.defaultLanguage.flag} alt={props.defaultLanguage.name} className="w-6 h-4" />
        {/* <span>{props.defaultLanguage.name}</span> */}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            {languages.map((language) => (
              <a
                key={language.code}
                href="#"
                onClick={() => selectLanguage(language)}
                className="text-gray-700 block px-4 py-2 text-sm flex items-center"
              >
                <img src={language.flag} alt={language.name} className="w-6 h-4 mr-2" />
                {language.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
