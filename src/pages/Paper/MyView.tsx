import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import React from "react";
import Application from "@/types/Application.ts";


// const warning = () => {
//     Modal.warning({
//         title: '删除账号',
//         content: '警告： 删除账号将会清除全部数据！',
//     });
// };

interface MyComponentProps {
    osInfo: string; // 这里定义了一个 string 类型的参数
    onExportAllAppMes:(apps: Application[]) => void;
}

const MyView: React.FC<MyComponentProps> = ({ osInfo, onExportAllAppMes}) => {
    const { t} = useTranslation();

    console.log('myView rendered'); // 确认组件重新渲染

    const handleExport = () => {
        console.log("导出文件")
        const appsD: Application[] = [];
        onExportAllAppMes(appsD)
    }

    return (
        <div>
            <h3>{t('my.plaform')}:   {osInfo}</h3>
            {/*<div onClick={warning}><h3>{t('my.delete')}</h3></div>*/}
            <Button style={{marginTop: '20px'}} type="primary" shape="round" onClick={() =>handleExport()}>  {t('my.exportAll')} </Button>
        </div>
    )
}
export default MyView;
