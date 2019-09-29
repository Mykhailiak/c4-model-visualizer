import React from 'react';
import { Layout } from 'antd';
import TextContentEditor from './TextContentEditor';

const {
  Sider,
  Content,
} = Layout;

function App() {
  return (
    <Layout className="app-layout">
      <Sider width="70">Sider</Sider>
      <Content>
        <TextContentEditor />
      </Content>
    </Layout>
  );
}

export default App;
