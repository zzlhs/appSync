import {
    HomeOutlined,
    OrderedListOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";

/**
 * 这里要和APP.tsx中的路由对象，记得放路由出口
 */

export const routes= [
    {
        label: "主页",
        icon: <HomeOutlined />,
        key: "home",
    },
    {
        label: "用户管理",
        icon: <UsergroupAddOutlined />,
        key: "user",
        children: [
            {
                label: "用户列表",
                key: "list",
                icon: <OrderedListOutlined />,
            },
            {
                label: "添加用户",
                key: "add",
                icon: <UserAddOutlined />,
            },
        ],
    },
];
