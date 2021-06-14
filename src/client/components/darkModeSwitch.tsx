import React from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import Actions from '../state/actions/actions';
const DarkModeSwitch: () => JSX.Element = () => {
    const dispatch = useAppDispatch();
    const darkMode = useAppSelector((state) => state.darkMode);
    return (
        <DarkModeToggle
            onChange={(val) => dispatch(Actions.SetDarkMode(val))}
            checked={darkMode}
            size={'6rem'}
            speed={2.5}
        />
    );
};
export default DarkModeSwitch;

// import React from 'react';
// import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
// import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';

// import { useAppDispatch, useAppSelector } from '../state/hooks';
// import Actions from '../state/actions/actions';

// interface Styles extends Partial<Record<SwitchClassKey, string>> {
//     focusVisible?: string;
// }

// interface Props extends SwitchProps {
//     classes: Styles;
// }

// const IOSSwitch = withStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             width: 42,
//             height: 26,
//             padding: 0,
//             margin: theme.spacing(3),
//         },
//         switchBase: {
//             padding: 1,
//             '&$checked': {
//                 transform: 'translateX(16px)',
//                 color: theme.palette.common.white,
//                 '& + $track': {
//                     backgroundColor: '#636896',
//                     opacity: 1,
//                     border: 'none',
//                 },
//             },
//             '&$focusVisible $thumb': {
//                 color: '#636896',
//                 border: '6px solid #fff',
//             },
//         },
//         thumb: {
//             width: 24,
//             height: 24,
//             border: `2px solid ${theme.palette.grey[400]}`,
//         },
//         track: {
//             borderRadius: 26 / 2,
//             border: `1px solid ${theme.palette.grey[400]}`,
//             backgroundColor: theme.palette.grey[50],
//             opacity: 1,
//             transition: theme.transitions.create(['background-color', 'border']),
//         },
//         checked: {},
//         focusVisible: {},
//     })
// )(({ classes }: Props) => {
//     const dispatch = useAppDispatch();
//     const darkMode = useAppSelector((state) => state.darkMode);
//     return (
//         <Switch
//             focusVisibleClassName={classes.focusVisible}
//             disableRipple
//             checked={darkMode}
//             classes={{
//                 root: classes.root,
//                 switchBase: classes.switchBase,
//                 thumb: classes.thumb,
//                 track: classes.track,
//                 checked: classes.checked,
//             }}
//             onChange={(e) => dispatch(Actions.SetDarkMode(e.target.checked))}
//         />
//     );
// });

// export default IOSSwitch;
