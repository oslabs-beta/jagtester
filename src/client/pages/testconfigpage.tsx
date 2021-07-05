import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Buttons from '../components/testConfigComponents/buttonsstartstop';
import TargetInputs from '../components/testConfigComponents/TargetInputs';
import RangeSliders from '../components/testConfigComponents/RangeSliders';

//MUI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
					</CardContent>
				</Card>
			</Col>
		</Row>
	);
};

export default TestPage;
