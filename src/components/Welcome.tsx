// src/components/Welcome.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';


const Welcome: React.FC = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        localStorage.setItem('lang', lng);
        i18n.changeLanguage(localStorage.getItem('lang')!);
        // console.log("setting language ... ", lng, i18n);
    };

    return (
        <div>
            <h2>{t('welcome')}</h2>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('zh')}>中文</button>
        </div>
    );
};

export default Welcome;
