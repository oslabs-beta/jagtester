import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Actions from '../../state/actions/actions';
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff',
		},
	})
);

const SimpleBackdrop: () => JSX.Element = () => {
	const dispatch = useAppDispatch();
	const isSpinning = useAppSelector((state) => state.stoppingSpinner);
	const classes = useStyles();

	return (
		<div>
			<Backdrop
				className={classes.backdrop}
				open={isSpinning}
				onClick={() => dispatch(Actions.SetStoppingSpinner(false))}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
};

export default SimpleBackdrop;
