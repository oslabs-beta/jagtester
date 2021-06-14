import React, { ClassAttributes } from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
// import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import Actions from '../state/actions/actions'
import { useAppDispatch, useAppSelector } from '../state/hooks';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1)
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#4d4e6d",
          opacity: 1,
          border: "none"
        }
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff"
      }
    },
    thumb: {
      width: 24,
      height: 24
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"])
    },
    checked: {},
    focusVisible: {}
  })
)(({ classes, ...props }: Props) => {
  const darkMode = useAppSelector((state) => state.darkMode);
  const dispatch = useAppDispatch();
  const handleChangeDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(Actions.SwitchDarkMode(event.target.checked));
  };
  
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      onChange={handleChangeDarkMode}
      checked= {!darkMode}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

// function CustomizedSwitches(): JSX.Element {
//   // const [state, setState] = React.useState({
//   //   checkedB: true
//   // });
//   const darkMode = useAppSelector((state) => state.darkMode);
//   const dispatch = useAppDispatch();

//   const handleChangeDarkMode = (event: React.ChangeEvent<HTMLInputElement>, newMode: boolean) => {
//     dispatch(Actions.SwitchDarkMode(true));
//   };

//   return (
//     <FormGroup>
//       <FormControlLabel
//         control={
//           <IOSSwitch
//             // checked={state.checkedB}
//             onChange={handleChangeDarkMode}
//             name="checkedB"
//           />
//         }
//         label="Dark Mode"
//       />
//     </FormGroup>
//   );
// }

export default IOSSwitch;