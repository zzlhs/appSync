// src/hooks/useI18n.ts
import { useTranslation } from 'react-i18next';

const useI18n = () => {
    const { t, i18n } = useTranslation();
    return { t, i18n };
};

export default useI18n;