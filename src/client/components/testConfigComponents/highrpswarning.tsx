import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Actions from '../../state/actions/actions';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const CustomizedSnackbars: () => JSX.Element = () => {
    const highRPSwarning = useAppSelector((state) => state.highRPSwarning);
    const dispatch = useAppDispatch();
    const classes = useStyles();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(Actions.SetHighRPSwarning(false));
    };

    return (
        <div className={classes.root}>
            <Snackbar open={highRPSwarning} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    Jagtester may experience slowdowns when testing higher RPS. Results will still
                    be accurate, but the test might take longer than expected. In case the Jagtester
                    server freezes, stop the server and reset with the button below.
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CustomizedSnackbars;
