import React from 'react';
import { Spin, Layout } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Sidebar({ updatingContent }) {
  return (
    <Layout.Sider width="70">
      {updatingContent && (
        <Spin
          style={{ width: '100%', paddingTop: 10 }}
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      )}
    </Layout.Sider>
  );
}
