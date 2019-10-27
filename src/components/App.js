import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import TextContentEditor from './TextContentEditor';
import Diagram from './Diagram';

const {
  Sider,
  Content,
} = Layout;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '' };

    this.updateData = this.updateData.bind(this);
  }

  updateData(event) {
    this.setState({ data: eval(event.target.value) });
  }

  render() {
    return (
      <Layout className="app-layout">
        <Sider width="70">Sider</Sider>
        <Content>
          <Row type='flex'>
            <Col span={6}>
              <TextContentEditor
                updateState={this.updateData}
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
