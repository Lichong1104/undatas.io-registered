import { HappyProvider } from "@ant-design/happy-work-theme";
import Registered from "./views/Registered/Registered";
import { ConfigProvider, App as AntdApp } from "antd";

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#2313d3" } }}>
      <AntdApp>
        <HappyProvider>
          <Registered />
        </HappyProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
