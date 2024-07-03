import { Button, Form, Input, message } from "antd";
import "./index.less";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import useI18n from '@/hooks/useI18n';


export default function Login() {
  const [form] = useForm();
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <div className="box relative" style={{ width: "100vw", height: "100vh" }}>
      <div
        className="absolute top-1/2 left-1/2 h-96 w-96 "
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <h1 className="text-center">{t('login.title')}</h1>
        <h3
          className="text-center font-normal text-base mt-4"
          style={{ color: "gray" }}
        >
          {t('login.welcome')}
        </h3>
        <Form
          className="mt-8"
          form={form}
          onFinish={() => {
            // const { username, code } = form.getFieldsValue();
            navigate("/home/index");
            // if (username === "123@qq.com" && code === "123123") {
            //   navigate("/home/index");
            // } else {
            //   message.error("验证错误");
            // }
          }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input
              type="email"
              prefix={<UserOutlined />}
              placeholder="请输入账号"
            />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { required: true, max: 6, message: "最长为6位" },
              { required: true, min: 6, message: "输入6位验证码" },
            ]}
          >
            <Input
              type="password"
              prefix={<LockOutlined />}
              placeholder="请输入6为验证码"
              maxLength={6}
              minLength={6}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {t('login.btn')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
