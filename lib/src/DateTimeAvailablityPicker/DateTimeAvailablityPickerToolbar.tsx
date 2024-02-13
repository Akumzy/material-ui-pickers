import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import DateTimeAvailablityPickerViewTabs from './DateTimeAvailablityPickerTabs';
import { useUtils } from '../_shared/hooks/useUtils';
import { DateTimeAvailablityPickerView } from './DateTimeAvailablityPicker';
import { ToolbarComponentProps } from '../Picker/Picker';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  _ => ({
    toolbar: {
      paddingLeft: 16,
      paddingRight: 16,
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default',
    },
  }),
  { name: 'MuiPickerDTAToolbar' }
);

export const DateTimeAvailablityPickerToolbar: React.FC<ToolbarComponentProps> = ({
  date,
  openView,
  setOpenView,
  hideTabs,
  dateRangeIcon,
  availabilityIcon,
  onChange,
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const showTabs = !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;

  return (
    <>
      <PickerToolbar isLandscape={false} className={classes.toolbar}>
        <Grid container justify="flex-start" direction="column">
          <div>
            <ToolbarButton
              variant="subtitle1"
              onClick={() => setOpenView('year')}
              selected={openView === 'year'}
              label={utils.getYearText(date)}
            />
          </div>
          <div>
            <ToolbarButton
              variant="h4"
              onClick={() => setOpenView('date')}
              selected={openView === 'date'}
              label={utils.getDateTimePickerHeaderText(date)}
            />
          </div>
        </Grid>
      </PickerToolbar>

      {showTabs && (
        <DateTimeAvailablityPickerViewTabs
          dateRangeIcon={dateRangeIcon}
          availabilityIcon={availabilityIcon}
          view={openView as DateTimeAvailablityPickerView}
          onChange={setOpenView}
        />
      )}
    </>
  );
};
