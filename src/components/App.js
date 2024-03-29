import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, message as antdMessage } from 'antd';
import c4InputValidator from '../utils/c4-input-validator';
import { parseAsync as parseYaml } from '../services/yaml-parser';
import TextContentEditor from './TextContentEditor';
import Diagram from './Diagram';
import LevelSelector, { rootLevel } from './LevelSelector';
import Sidebar from './Sidebar';
import { messageBuilder } from '../utils/error-adapter';
import mock from '../mock.json';

const isDevEnv = process.env.NODE_ENV === 'development';

export default function App() {
  const [data, setData] = useState({});
  const [parsingStatus, setParsingStatus] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [updatingContent, setUpdatingContent] = useState(false);

  useEffect(() => {
    if (isDevEnv) {
      setData(mock);
      setParsingStatus('success');
      setSelectedLevel(selectedLevel || rootLevel);
      setUpdatingContent(false);
    }
  }, []);

  const updateData = (input) =>
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
      });
  const onUpdateError = (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    antdMessage.error(messageBuilder(e.message));
  };

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
              onUpdateError={onUpdateError}
            />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
