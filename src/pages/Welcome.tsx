import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router';

const WelcomePage = () => {
    const { t } = useTranslation()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg ">
        {/* Заголовок и кнопка */}
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-4">
          {t('welcome.title_congratulation')}
        </h1>

        {/* Кнопка с переходом на веб-приложение */}
        <div className="flex justify-center mb-6">
          <Link
            to="/" // Ссылка на домашнюю страницу
            className="inline-block bg-indigo-600 text-white text-lg font-medium py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {t('welcome.open_button')}
          </Link>
        </div>

        <hr />

        {/* Описание про контекстное меню (выделено как второстепенная информация) */}
        <p className="text-sm text-gray-500 text-center mt-4">
          <Trans i18nKey={'welcome.context_menu.instruction'} values={{
            context_menu_item: `"${t('welcome.context_menu.button_title')}"`
          }}/>
        </p>
        <br />

        {/* Изображение контекстного меню */}
        <div className="flex justify-center mb-4">
          <img 
            src={`/welcome_page/en/instruction1.webp`} // Замените на актуальный путь к изображению
            alt="Context Menu Screenshot"
            className="w-2/3 mx-auto mb-4 opacity-70 rounded-lg" // Уменьшение размера и полупрозрачность
          />
        </div>
        <p className='text-center mb-6 text-3xl'>⇩</p>
        <div className="flex justify-center mb-4">
          <img 
            src={`/welcome_page/en/instruction2.webp`} // Замените на актуальный путь к изображению
            alt="Context Menu Screenshot"
            className="w-2/3 mx-auto mb-4 opacity-70 rounded-lg" // Уменьшение размера и полупрозрачность
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
