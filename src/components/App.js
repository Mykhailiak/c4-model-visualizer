import React, { Component } from 'react';
import {
  Layout,
  Row,
  Col,
  Spin,
  Icon,
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
      updatingState: false,
    };

    this.selectLevel = this.selectLevel.bind(this);
    this.setUpdatingState = this.setUpdatingState.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  setUpdatingState(value = false) {
    this.setState({ updatingState: value });
  }

  updateData(input) {
    return parseYaml(input)
      .then((data) => this.setState((state) => ({
        data,
        parsingStatus: 'success',
        selectedLevel: state.selectedLevel || rootLevel,
        updatingState: false,
      })))
      .catch(() => this.setState({
        parsingStatus: 'error',
        data: {},
        selectedLevel: null,
        updatingState: false,
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
      updatingState,
    } = this.state;
    // TODO: Move Sider to another component
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    return (
      <Layout className="app-layout">
        <Sider width="70">
          {updatingState && <Spin style={{ width: '100%', paddingTop: 10 }} indicator={antIcon} />}
        </Sider>
        <Content>
          <Row type="flex">
            <Col span={8} className="sidebar">
              <TextContentEditor
                updateState={this.updateData}
                status={parsingStatus}
                setUpdatingState={this.setUpdatingState}
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
