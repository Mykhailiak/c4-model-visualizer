import React from 'react';
import { Alert } from 'antd';

const messages = {
  success: 'Valid input',
  error: 'Syntax error',
};

export default function ContentStatus({ type }) {
  return (
    type && (
      <Alert
        className="content-status-alert"
        type={type}
        message={messages[type]}
        showIcon
      />
    )
  );
}
