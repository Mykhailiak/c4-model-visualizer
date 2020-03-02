import React, { useState } from 'react';
import {
  Layout,
  Row,
  Col,
} from 'antd';
import c4InputValidator from 'c4-model-visualizer-core/utils/c4-input-validator';
import { parseAsync as parseYaml } from 'c4-model-visualizer-core/utils/yaml-parser';
import TextContentEditor from './TextContentEditor';
import Diagram from './Diagram';
import LevelSelector, { rootLevel } from './LevelSelector';
import Sidebar from './Sidebar';

const App = () => {
  const [data, setData] = useState({});
  const [parsingStatus, setParsingStatus] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [updatingContent, setUpdatingContent] = useState(false);

  const updateData = (input) => (
    parseYaml(input)
      .then(c4InputValidator)
      .then((processedData) => {
        setData(processedData);
        setParsingStatus('success');
        setSelectedLevel(selectedLevel || rootLevel);
        setUpdatingContent(false);
      })
      .catch(() => {
        setData({});
        setParsingStatus('error');
        setSelectedLevel(null);
        setUpdatingContent(false);
      })
  );

  return (
    <Layout className="app-layout">
      <Sidebar updatingContent={updatingContent} />
      <Layout.Content>
        <Row type="flex">
          <Col span={8} className="sidebar">
            <TextContentEditor
              updateState={updateData}
              status={parsingStatus}
              setUpdatingState={setUpdatingContent}
            />
          </Col>
          <Col span={16}>
            <LevelSelector
              parsedYaml={data}
              selectLevel={setSelectedLevel}
              value={selectedLevel}
            />
            <Diagram
              data={data}
              selectLevel={setSelectedLevel}
              selectedLevel={selectedLevel}
            />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default App;
