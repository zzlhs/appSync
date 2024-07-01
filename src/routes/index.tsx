import {
  HomeOutlined,
  OrderedListOutlined,
  // UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

/**
 * 这里要和APP.tsx中的路由对象，记得放路由出口
 */

export const routes: MenuItem[] = [
  {
    label: "你好！",
    icon: <HomeOutlined />,
    key: "home",
  },
  {
    label: "应用管理",
    icon: <UsergroupAddOutlined />,
    key: "main",
    // children: [
    //   {
    //     label: "用户列表",
    //     key: "list",
    //     icon: <OrderedListOutlined />,
    //   },
    //   {
    //     label: "添加用户",
    //     key: "add",
    //     icon: <UserAddOutlined />,
    //   },
    // ],
  }, {
    label: "我的",
    icon: <OrderedListOutlined />,
    key: "my",
  },
];
