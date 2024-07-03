import React from "react";
import { Avatar, List } from 'antd';
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
    console.log("mainView 11111", apps);

    return(
        <List
            itemLayout="horizontal"
            dataSource={apps}
            renderItem={(item, index) => (
                <List.Item actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}>
                    <List.Item.Meta
                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                        title={<a href="https://ant.design">{item.name}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />
    )

}


export default MainView;