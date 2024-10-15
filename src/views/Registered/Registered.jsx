import { useRef, useState } from "react";
import logo from "../../image/logo.png";
import styled from "styled-components";
import loginImg from "../../image/login.png";
import { App, Button, Input, Space, Tabs } from "antd";
import { registerEmailApi, sendEmailCodeApi } from "../../api/httpApi";

// 注册组件
function Registered() {
  const { message, notification } = App.useApp();

  // 创建输入框的引用
  const username = useRef(null);
  const password = useRef(null);
  const email = useRef(null);
  const inviteCode = useRef(null);
  const verificationCode = useRef(null);
  // 状态管理
  const [isSendCode, setIsSendCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);

  // 注册函数
  const register = async () => {
    const usernameValue = username.current.input.value;
    const passwordValue = password.current.input.value;
    const inviteCodeValue = inviteCode.current.input.value;
    const verificationCodeValue = verificationCode.current.input.value;
    if (
      !usernameValue ||
      !passwordValue ||
      !inviteCodeValue ||
      !verificationCodeValue
    )
      return message.warning("Please enter complete information");

    setLoading(true);

    const emailValue = email.current.input.value;
    if (!emailValue) return message.warning("Please enter email");
    const res = await registerEmailApi(
      usernameValue,
      passwordValue,
      emailValue,
      inviteCodeValue,
      verificationCodeValue
    );

    // 处理注册结果
    setTimeout(() => {
      if (res.code !== 200) {
        setLoading(false);
        return message.error(res.msg);
      }

      setLoading(false);
      notification.success({
        message: "Registration Successful",
        description: "Please proceed to login",
      });
      window.location.href = "https://platform.undatas.io/";
    }, 1000);
  };

  // 发送邮箱验证码
  const sendEmailCode = async () => {
    const emailValue = email.current.input.value;
    if (!emailValue) return message.warning("Please enter email!");
    setCodeLoading(true);
    const res = await sendEmailCodeApi(emailValue);
    setCodeLoading(false);
    if (res.code !== 200) return message.error(res.msg);
    setIsSendCode(true);
    message.success(
      "Verification code has been sent to your email. Please check!"
    );
  };

  // 定义注册表单项
  const items = [
    {
      key: "2",
      label: "Email Registration",
      children: (
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <Input placeholder={"Enter username"} size="large" ref={username} />
          <Input
            placeholder={"Enter password"}
            type="password"
            size="large"
            ref={password}
          />
          <Input
            placeholder={"Enter invite code"}
            size="large"
            ref={inviteCode}
          />

          <CodeCom>
            <Input placeholder={"Enter email"} size="large" ref={email} />
            <Button
              size="large"
              type="primary"
              disabled={isSendCode}
              onClick={sendEmailCode}
              loading={codeLoading}
              style={{ margin: 0, height: 50, width: "45%" }}
            >
              {!isSendCode ? "Send Email Verification" : "Sent"}
            </Button>
          </CodeCom>
          <Input
            placeholder={"Enter verification code"}
            size="large"
            ref={verificationCode}
          />
        </Space>
      ),
    },
  ];

  // 渲染组件
  return (
    <MainBox>
      <BackGround>
        <p>@undatas.io</p>
        <div>
          <h1>UNDATAS.IO</h1>
          <p>Get highly productive through automation and save tons of time!</p>
        </div>
        <p>© 2024 MIND-COMPUTE AI</p>
      </BackGround>
      <Action>
        <LoginBox>
          <h1>
            <img src={logo} alt="" />
            Register
          </h1>
          <h2>
            Already have an account?{" "}
            <a href="https://platform.undatas.io/">Click to Login</a>
          </h2>

          <Tabs defaultActiveKey="1" items={items} style={{ width: "100%" }} />

          <Button
            size="large"
            type="primary"
            loading={loading}
            style={{ height: "50px", fontSize: "20px" }}
            onClick={register}
          >
            Register
          </Button>
          <span>
            By registering, you agree to our{" "}
            <a href="/#" onClick={(e) => e.preventDefault()}>
              User Agreement
            </a>
          </span>
        </LoginBox>
      </Action>
    </MainBox>
  );
}

// 样式组件定义
const MainBox = styled.div`
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  overflow: hidden;
  > div {
    height: 100%;
  }
`;

const CodeCom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

const BackGround = styled.div`
  width: 60%;
  background-image: linear-gradient(180deg, #4334e1, rgba(46, 53, 71, 0.35)),
    url(${loginImg});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 40px 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    height: 28px;
  }
  > p {
    color: #f5f5f5ba;
    font-size: 14px;
  }
  > div {
    color: white;
    h1 {
      font-size: 96px;
      margin-top: -300px;
      font-style: italic;
    }

    p {
      margin-top: 16px;
      font-size: 20px;
      letter-spacing: 2px;
      margin-left: 8px;
      font-style: italic;
    }
  }
`;

const Action = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  max-width: 560px;
  width: 90%;
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-style: italic;
  h1 {
    font-size: 60px;
    letter-spacing: 4px;
    display: flex;
    align-items: center;
    gap: 12px;
    img {
      width: 60px;
      height: 60px;
    }
  }
  h2 {
    font-size: 16px;
    font-weight: 300;
  }
  input {
    height: 50px;
    width: 100%;
  }
  button {
    width: 100%;
    margin-top: 20px;
  }
  > span {
    font-size: 14px;
    color: #808080c3;
  }
`;

export default Registered;
