import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import React from "react";


// const warning = () => {
//     Modal.warning({
//         title: '删除账号',
//         content: '警告： 删除账号将会清除全部数据！',
//     });
// };

const MyView: React.FC = () => {
    const { t} = useTranslation();

    console.log('myView rendered'); // 确认组件重新渲染


    const handleExport = () => {
        console.log("导出文件")
    }

    return (
        <div>
            <h3>{t('my.plaform')}:</h3>
            {/*<div onClick={warning}><h3>{t('my.delete')}</h3></div>*/}
            <Button style={{marginTop: '20px'}} type="primary" shape="round" onClick={() =>handleExport()}>  {t('my.exportAll')} </Button>
            <p>osInfo</p>
        </div>
    )
}
export default MyView;
