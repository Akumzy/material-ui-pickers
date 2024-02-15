import * as React from 'react';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import { DateTimeAvailablityPickerTabs } from './DateTimeAvailablityPickerTabs';
import { useUtils } from '../_shared/hooks/useUtils';
import { DateTimeAvailablityPickerView } from './DateTimeAvailablityPicker';
import { makeStyles } from '@material-ui/core/styles';
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

  const dateText = React.useMemo(() => {
    if (!date) {
      return toolbarPlaceholder;
    }
    if (toolbarFormat) {
      return utils.formatByString(date, toolbarFormat);
    }

    return utils.format(date, 'normalDateWithWeekday');
  }, [date, toolbarFormat, toolbarPlaceholder, utils]);

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
            value={date ? utils.format(date, 'year') : '–'}
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
