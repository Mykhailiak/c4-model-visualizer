import React, { Component } from 'react';
import {
  Layout, Row, Col, TreeSelect,
} from 'antd';
import TextContentEditor from './TextContentEditor';
import Diagram from './Diagram';
import { parseAsync as parseYaml } from '../utils/yaml-parser';

const {
  Sider,
  Content,
} = Layout;

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
  },
];

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: '',
      parsingStatus: null,
    };
  }

  updateData(input) {
    return parseYaml(input)
      .then((data) => this.setState({ data, parsingStatus: 'success' }))
      .catch(() => this.setState({ parsingStatus: 'error' }));
  }

  render() {
    const { parsingStatus, value, data } = this.state;

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
              <TreeSelect
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                placeholder="Please select context"
                treeDefaultExpandAll
                onChange={this.onChange}
                className="context-selection"
              />
              <Diagram
                data={data}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
