
import { useState } from "react";
import { ProLayout } from "@ant-design/pro-components";

// import defaultProps from "./_defaultProps";
import logo from "@public/icon.ico";

export default () => {
  const [pathname, setPathname] = useState("/home");
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        title="后台管理系统"
        logo={logo}
        location={{
          pathname,
        }}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              setPathname(item.path || "/home");
            }}
          >
            {dom}
          </div>
        )}
      ></ProLayout>
    </div>
  );
};
