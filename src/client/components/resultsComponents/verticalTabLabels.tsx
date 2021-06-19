import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import Actions from '../../state/actions/actions';

const useStyles = makeStyles(() => ({
    deleteIcon: {
        fontSize: '2rem',
        '&:hover': {
            color: '#c20045',
        },
    },
}));

const TabLabels: (props: { index: number; time: number }) => JSX.Element = ({ index, time }) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const receivedData = useAppSelector((state) => state.receivedData);

    const handleDelete = () => {
        dispatch(Actions.DeleteSingleData(index));
        dispatch(Actions.SetResultsTabValue(index));
    };

    const handleExport = () => {
        const element = document.createElement('a');
        element.setAttribute(
            'href',
            'data:application/json;charset=utf-8,' +
                encodeURIComponent(JSON.stringify(receivedData[index], null, 4))
        );
        element.setAttribute(
            'download',
            `jagtester-export-single-${new Date(
                receivedData[index].testTime
            ).toLocaleString()}.json`
        );
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <Row className="align-items-center">
            <Col>{new Date(time).toLocaleString()}</Col>
            <Col>
                <GetAppIcon color="primary" className={classes.deleteIcon} onClick={handleExport} />
                <DeleteIcon
                    color="secondary"
                    className={classes.deleteIcon}
                    onClick={handleDelete}
                />
            </Col>
        </Row>
    );
};

export default TabLabels;
