// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '@/locales/en/translation.json';
import zhTranslation from '@/locales/zh/translation.json';

// 初始化i18next
i18n
    .use(LanguageDetector) // 检测用户语言
    .use(initReactI18next) // 将 i18next 传递给 react-i18next
    .init({
        resources: {
            en: {
                translation: enTranslation,
            },
            zh: {
                translation: zhTranslation,
            },
        },
        fallbackLng: 'zh', // 当检测不到用户语言时的默认语言
        interpolation: {
            escapeValue: false, // react 已经默认安全了，不需要再次转义
        },
        debug: true
    });

// 监听语言变化事件
i18n.on('languageChanged', (lng) => {
    console.log(`Language changed to ${lng}`);
});
export default i18n;
