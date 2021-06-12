import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch } from '../../state/hooks';
import Actions from '../../state/actions/actions';
import { HTTPMethods } from '../../interfaces';

const useStyles = makeStyles(() => ({
    deleteIcon: {
        fontSize: '2rem',
        '&:hover': {
            color: '#c20045', // TODO add more consistent styling
        },
    },
}));

const TabLabels: (props: { index: number; time: number }) => JSX.Element = ({ index, time }) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const handleDelete = () => {
        dispatch(Actions.DeleteSingleData(index));
        dispatch(Actions.SetResultsTabValue(index));
        fetch(`/api/singledata/${index}`, {
            method: HTTPMethods.DELETE,
        }).catch((err) => {
            dispatch(Actions.SetShowModal(true));
            dispatch(Actions.SetModalError(err.toString()));
        });
    };
    return (
        <Row className="align-items-center">
            <Col>{new Date(time).toLocaleString()}</Col>
            <Col>
                <DeleteIcon color="primary" className={classes.deleteIcon} onClick={handleDelete} />
                <GetAppIcon
                    color="primary"
                    className={classes.deleteIcon}
                    onClick={() => console.log('test')}
                />
            </Col>
        </Row>
    );
};

export default TabLabels;
