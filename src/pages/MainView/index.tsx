import React from "react";
import { useTranslation } from 'react-i18next';
import { Avatar, List, Button } from 'antd';
import Application from "@/types/Application.ts";


interface MainViewProps {
    apps: Array<Application>;
}

/**
 * 1 React 组件的 props 类型定义应使用接口，而不是直接定义为数组。
 * 2 组件的 props 解构在函数参数中进行。
 * 3 修正类型定义和导入路径。
 *
 * @param apps
 * @constructor
 *
 */
const MainView: React.FC<MainViewProps> = ({ apps}) => {
    const { t} = useTranslation();
    console.log("mainView 11111", apps);

    function handleInstall(): void {
        console.log("安装文件")
    }

    return(
        <List
            itemLayout="horizontal"
            dataSource={apps}
            renderItem={(item, index) => (
                <List.Item actions={[
                    item.localIsInstalled ?
                        <Button type="primary" shape="round" disabled>  {t('main.installed')} </Button> :
                        <Button type="primary" shape="round" onClick={handleInstall}>{t('main.uninstall')}</Button>]}>
                    <List.Item.Meta
                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}/>}
                        title={<a href="https://ant.design">{item.name}</a>}
                        description={item.desc}
                    />
                </List.Item>
            )}
        />
    )

}


export default MainView;