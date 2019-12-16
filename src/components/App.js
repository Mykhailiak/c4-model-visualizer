import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import TextContentEditor from './TextContentEditor';
import Diagram from './Diagram';
import { parseAsync as parseYaml } from '../utils/yaml-parser';

const {
  Sider,
  Content,
} = Layout;


class App extends Component {
  state = {
    data: '',
  }

  updateData(input) {
    return parseYaml(input)
      .then(data => this.setState({ data }))
      .catch(console.log)
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
