import React from 'react';
import { Layout } from 'antd';
import TextContentEditor from './TextContentEditor';
import Diagram from './Diagram';

const {
  Sider,
  Content,
} = Layout;

function App() {
  return (
    <Layout className="app-layout">
      <Sider width="70">Sider</Sider>
      <Content>
        <Diagram />
      </Content>
    </Layout>
  );
}

export default App;
