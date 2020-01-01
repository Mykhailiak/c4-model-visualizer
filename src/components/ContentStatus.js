import React from 'react';
import { Alert } from 'antd';

const messages = {
  success: 'OK',
  error: 'Syntax error',
};

export default ({ type }) => (type
    && (
    <Alert
      className="content-status-alert"
      type={type}
      message={messages[type]}
      showIcon
    />
    )
);
