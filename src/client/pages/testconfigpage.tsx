import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Buttons from '../components/testConfigComponents/buttonsstartstop';
import TargetInputs from '../components/testConfigComponents/TargetInputs';
import RangeSliders from '../components/testConfigComponents/RangeSliders';

//MUI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const TestPage: () => JSX.Element = () => {
  return (
    <Row className="mx-4">
      <Col className="col-12 col-xl-6">
        <Card raised className="p-2">
          <CardContent>
            <TargetInputs />
          </CardContent>
        </Card>
      </Col>
      <Col className="col-12 col-xl-6">
        <Card raised className="p-2">
          <CardContent>
            <RangeSliders />
            <Buttons />
            {process.env.JAG === 'demo' && (
              <Typography paragraph variant="h5" align="center">
                Warning! Currently running in demo mode and you cannot start any tests. You can look around the app and check out our features. Take a look at the results page and see what kinds of
                data we are reporting. To use it, simply download from npm and use it locally.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Col>
    </Row>
  );
};

export default TestPage;
