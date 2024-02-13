import * as React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import { DateTimeAvailablityPickerView } from './DateTimeAvailablityPicker';
import { DateRangeIcon } from '../_shared/icons/DateRangeIcon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AvailabilityIcon } from '../_shared/icons/AvailabilityIcon';

const viewToTabIndex = (openView: DateTimeAvailablityPickerView) => {
  if (openView === 'date' || openView === 'year') {
    return 'date';
  } else if (openView === 'availability') {
    return 'availability';
  }

  return 'time';
};

const tabIndexToView = (tab: DateTimeAvailablityPickerView) => {
  if (tab === 'date') {
    return 'date';
  } else if (tab === 'availability') {
    return 'availability';
  }

  return 'hours';
};

export interface DateTimeAvailablityPickerViewTabsProps {
  view: DateTimeAvailablityPickerView;
  onChange: (view: DateTimeAvailablityPickerView) => void;
  dateRangeIcon?: React.ReactNode;
  availabilityIcon?: React.ReactNode;
}

export const useStyles = makeStyles(
  theme => {
    // prettier-ignore
    const tabsBackground = theme.palette.type === 'light'
    ? theme.palette.primary.main
    : theme.palette.background.default;

    return {
      tabs: {
        color: theme.palette.getContrastText(tabsBackground),
        backgroundColor: tabsBackground,
      },
    };
  },
  { name: 'MuiPickerDTTabs' }
);

export const DateTimeAvailablityPickerViewTabs: React.SFC<DateTimeAvailablityPickerViewTabsProps> = ({
  view,
  onChange,
  dateRangeIcon,
  availabilityIcon,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';
  const handleChange = (e: React.ChangeEvent<{}>, value: DateTimeAvailablityPickerView) => {
    if (value !== viewToTabIndex(view)) {
      onChange(tabIndexToView(value));
    }
  };

  return (
    <Paper>
      <Tabs
        variant="fullWidth"
        value={viewToTabIndex(view)}
        onChange={handleChange}
        className={classes.tabs}
        indicatorColor={indicatorColor}
      >
        <Tab value="date" icon={<>{dateRangeIcon}</>} />
        <Tab value="availability" icon={<>{availabilityIcon}</>} />
      </Tabs>
    </Paper>
  );
};

DateTimeAvailablityPickerViewTabs.defaultProps = {
  dateRangeIcon: <DateRangeIcon />,
  availabilityIcon: <AvailabilityIcon />,
};

export default DateTimeAvailablityPickerViewTabs;
