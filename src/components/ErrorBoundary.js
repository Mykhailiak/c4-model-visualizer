import React, { Component } from 'react';
import { Result, Card } from 'antd';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { error: false };
  }

  static getDerivedStateFromError() {
    return { error: true };
  }

  render() {
    const { state, props } = this;

    if (state.error) {
      return (
        <section className="error-bounday">
          <Card>
            <Result
              status="error"
              title="Submission Failed"
              subTitle="Please check and modify the following information before resubmitting."
            />
          </Card>
        </section>
      );
    }

    return props.children;
  }
}

export default ErrorBoundary;
