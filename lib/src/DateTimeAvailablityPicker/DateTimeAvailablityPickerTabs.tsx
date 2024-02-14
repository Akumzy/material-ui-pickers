import * as React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import { DateTimeAvailablityPickerView } from './DateTimeAvailablityPicker';
import { DateRangeIcon } from '../_shared/icons/DateRange';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AvailabilityIcon } from '../_shared/icons/AvailabilityIcon';
import { WrapperVariantContext } from '../wrappers/WrapperVariantContext';
import clsx from 'clsx';

const viewToTabIndex = (openView: DateTimeAvailablityPickerView) => {
  if (openView === 'availability') {
    return 'availability';
  }

  return 'date';
};

const tabIndexToView = (tab: DateTimeAvailablityPickerView) => {
  if (tab === 'availability') {
    return 'availability';
  }

  return 'date';
};

export interface DateTimeAvailablityPickerTabsProps {
  view: DateTimeAvailablityPickerView;
  onChange: (view: DateTimeAvailablityPickerView) => void;
  dateRangeIcon?: React.ReactNode;
  availabilityIcon?: React.ReactNode;
}

export const useStyles = makeStyles(
  (theme) => {
    // prettier-ignore
    const tabsBackground = theme.palette.type === 'light'
    ? theme.palette.primary.main
    : theme.palette.background.default;

    return {
      root: {},
      modeDesktop: {
        order: 1,
      },
      tabs: {
        color: theme.palette.getContrastText(tabsBackground),
        backgroundColor: tabsBackground,
      },
    };
  },
  { name: 'MuiDateTimeAvailablityPickerTabs' }
);

export const DateTimeAvailablityPickerTabs: React.FC<DateTimeAvailablityPickerTabsProps> = (
  props
) => {
  const {
    dateRangeIcon = <DateRangeIcon />,
    availabilityIcon = <AvailabilityIcon />,
    onChange,
    view,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const wrapperVariant = React.useContext(WrapperVariantContext);

  const indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';
  const handleChange = (e: React.ChangeEvent<{}>, value: DateTimeAvailablityPickerView) => {
    if (value !== viewToTabIndex(view)) {
      onChange(tabIndexToView(value));
    }
  };

  return (
    <Paper className={clsx(classes.root, { [classes.modeDesktop]: wrapperVariant === 'desktop' })}>
      <Tabs
        variant="fullWidth"
        value={viewToTabIndex(view)}
        onChange={handleChange}
        className={classes.tabs}
        indicatorColor={indicatorColor}
      >
        <Tab
          value="date"
          aria-label="pick date"
          icon={<React.Fragment>{dateRangeIcon}</React.Fragment>}
        />
        <Tab
          value="availability"
          aria-label="pick availability"
          icon={<React.Fragment>{availabilityIcon}</React.Fragment>}
        />
      </Tabs>
    </Paper>
  );
};

export default DateTimeAvailablityPickerTabs;
