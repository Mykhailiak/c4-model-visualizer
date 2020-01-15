import React, { Component } from 'react';
import {
  Layout,
  Row,
  Col,
} from 'antd';
import TextContentEditor from './TextContentEditor';
import Diagram from './Diagram';
import LevelSelector, { rootLevel } from './LevelSelector';
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
      selectedLevel: null,
    };

    this.selectLevel = this.selectLevel.bind(this);
  }

  updateData(input) {
    return parseYaml(input)
      .then((data) => this.setState((state) => ({
        data,
        parsingStatus: 'success',
        selectedLevel: state.selectedLevel || rootLevel,
      })))
      .catch(() => this.setState({
        parsingStatus: 'error',
        data: {},
        selectedLevel: null,
      }));
  }

  selectLevel(value) {
    this.setState({ selectedLevel: value });
  }

  render() {
    const {
      parsingStatus,
      data,
      selectedLevel,
    } = this.state;

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
                selectLevel={this.selectLevel}
                value={selectedLevel}
              />
              <Diagram
                data={data}
                selectedLevel={selectedLevel}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
