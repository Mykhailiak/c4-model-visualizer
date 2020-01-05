import React, { Component } from 'react';
import {
  Layout,
  Row,
  Col,
} from 'antd';
import TextContentEditor from './TextContentEditor';
import Diagram from './Diagram';
import LevelSelector from './LevelSelector';
import { parseAsync as parseYaml } from '../utils/yaml-parser';

const {
  Sider,
  Content,
} = Layout;

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: {},
      parsingStatus: null,
    };
  }

  updateData(input) {
    return parseYaml(input)
      .then((data) => this.setState({ data, parsingStatus: 'success' }))
      .catch(() => this.setState({ parsingStatus: 'error' }));
  }

  render() {
    const { parsingStatus, data } = this.state;

    return (
      <Layout className="app-layout">
        <Sider width="70">Sider</Sider>
        <Content>
          <Row type="flex">
            <Col span={8} className="sidebar">
              <TextContentEditor
                updateState={(payload) => this.updateData(payload)}
                status={parsingStatus}
              />
            </Col>
            <Col span={16}>
              <LevelSelector
                parsedYaml={data}
              />
              <Diagram data={data} />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
