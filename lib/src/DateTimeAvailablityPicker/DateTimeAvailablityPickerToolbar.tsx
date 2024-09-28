import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import { DateTimeAvailablityPickerTabs } from './DateTimeAvailablityPickerTabs';
import { useUtils } from '../_shared/hooks/useUtils';
import { DateTimeAvailablityPickerView } from './DateTimeAvailablityPicker';
import { ToolbarComponentProps } from '../Picker/SharedPickerProps';

const muiComponentConfig = { name: 'MuiDateTimeAvailablityPickerToolbar' };

export const useStyles = makeStyles(
  {
    root: {
      paddingLeft: 16,
      paddingRight: 16,
      justifyContent: 'space-around',
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default',
    },
    timeContainer: {
      display: 'flex',
    },
    dateContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    timeTypography: {},
    penIcon: {
      position: 'absolute',
      top: 8,
      right: 8,
    },
  },
  muiComponentConfig
);
export const DateTimeAvailablityPickerToolbar: React.FC<ToolbarComponentProps> = (props) => {
  const {
    date,
    dateRangeIcon,
    availabilityIcon,
    hideTabs,
    isMobileKeyboardViewOpen,
    onChange,
    openView,
    setOpenView,
    toggleMobileKeyboardView,
    toolbarFormat,
    toolbarPlaceholder = '––',
    toolbarTitle = 'SELECT DATE',
    ...other
  } = props;

  const utils = useUtils();
  const classes = useStyles();
  const showTabs = !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;
  const newDate = date || new Date();
  const dateText = React.useMemo(() => {
    if (!newDate) {
      return toolbarPlaceholder;
    }
    if (toolbarFormat) {
      return utils.formatByString(newDate, toolbarFormat);
    }

    return utils.format(newDate, 'normalDateWithWeekday');
  }, [newDate, toolbarFormat, toolbarPlaceholder, utils]);

  return (
    <React.Fragment>
      <PickerToolbar
        toolbarTitle={toolbarTitle}
        penIconClassName={classes.penIcon}
        className={classes.root}
        isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
        toggleMobileKeyboardView={toggleMobileKeyboardView}
        {...other}
        isLandscape={false}
      >
        <div className={classes.dateContainer}>
          <ToolbarButton
            tabIndex={-1}
            variant="subtitle1"
            onClick={() => setOpenView('year')}
            selected={openView === 'year'}
            value={newDate ? utils.format(newDate, 'year') : '–'}
          />
        </div>
        <div>
          <ToolbarButton
            tabIndex={-1}
            variant="h4"
            data-mui-test="datetimepicker-toolbar-date"
            onClick={() => setOpenView('date')}
            selected={openView === 'date'}
            value={dateText}
          />
        </div>
      </PickerToolbar>

      {showTabs && (
        <DateTimeAvailablityPickerTabs
          dateRangeIcon={dateRangeIcon}
          availabilityIcon={availabilityIcon}
          view={openView as DateTimeAvailablityPickerView}
          onChange={setOpenView}
        />
      )}
    </React.Fragment>
  );
};
