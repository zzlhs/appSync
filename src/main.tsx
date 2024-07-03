import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from "./App.tsx";
import "./index.less";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();


if(!localStorage.getItem('lang')){
    localStorage.setItem('lang', 'zh')
}
i18n.changeLanguage(localStorage.getItem('lang')!);


ReactDOM.createRoot(document.getElementById("root")!).render(
    <I18nextProvider i18n={i18n}>
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
        </React.StrictMode>
    </I18nextProvider>
);
