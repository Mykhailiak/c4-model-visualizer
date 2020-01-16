import React, { Component } from 'react';
import {
  Layout,
  Row,
  Col,
} from 'antd';
import TextContentEditor from './TextContentEditor';
import Diagram from './Diagram';
import LevelSelector, { rootLevel } from './LevelSelector';
import Sidebar from './Sidebar';
import { parseAsync as parseYaml } from '../utils/yaml-parser';
import c4InputValidator from '../utils/c4-input-validator';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: {},
      parsingStatus: null,
      selectedLevel: null,
      updatingContent: false,
    };

    this.selectLevel = this.selectLevel.bind(this);
    this.setUpdatingState = this.setUpdatingState.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  setUpdatingState(value = false) {
    this.setState({ updatingContent: value });
  }

  updateData(input) {
    return parseYaml(input)
      .then(c4InputValidator)
      .then((data) => this.setState((state) => ({
        data,
        parsingStatus: 'success',
        selectedLevel: state.selectedLevel || rootLevel,
        updatingContent: false,
      })))
      .catch(() => this.setState({
        parsingStatus: 'error',
        data: {},
        selectedLevel: null,
        updatingContent: false,
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
      updatingContent,
    } = this.state;

    return (
      <Layout className="app-layout">
        <Sidebar updatingContent={updatingContent} />
        <Layout.Content>
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
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
