import React from 'react';
import { Spin, Icon, Layout } from 'antd';

export default function Sidebar({ updatingContent }) {
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return (
    <Layout.Sider width="70">
      {updatingContent && <Spin style={{ width: '100%', paddingTop: 10 }} indicator={antIcon} />}
    </Layout.Sider>
  );
}
