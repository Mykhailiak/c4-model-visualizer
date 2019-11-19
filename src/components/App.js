import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import TextContentEditor from './TextContentEditor';
import Diagram from './Diagram';

const {
  Sider,
  Content,
} = Layout;


class App extends Component {
  state = {
    data: '',
  }

  updateData(data) {
    this.setState({ data });
  }

  render() {
    return (
      <Layout className="app-layout">
        <Sider width="70">Sider</Sider>
        <Content>
          <Row type='flex'>
            <Col span={6}>
              <TextContentEditor
                updateState={data => this.updateData(data)}
              />
            </Col>
            <Col span={18}>
              <Diagram
                data={this.state.data}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
