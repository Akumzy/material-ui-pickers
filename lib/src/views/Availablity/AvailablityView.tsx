import * as React from 'react';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { useUtils } from '../../_shared/hooks/useUtils';
import { AvailabilityObject, ParsableDate } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
import { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { TrashIcon } from '../../_shared/icons/TrashIcon';
import DateFnsUtils from '@date-io/date-fns';

export interface AvailabilityProps {
  date: MaterialUiPickersDate;
  availabilityTitle?: string;
  availabilities: AvailabilityObject[];
  minDate?: ParsableDate;
  maxDate?: ParsableDate;
  onChange: (date: MaterialUiPickersDate, isFinish: boolean) => void;
  disablePast?: boolean | null | undefined;
  disableFuture?: boolean | null | undefined;
}

export const useStyles = makeStyles(
  {
    container: {
      width: 310,
      minHeight: 305,
      paddingTop: 20,
    },
    addContainer: {
      padding: '20px 16px',
    },
    itemList: {
      paddingLeft: 16,
    },
    header: {
      fontSize: 18,
      paddingLeft: 16,
    },
  },
  { name: 'MuiPickersMonthSelection' }
);

export const Availability: React.FC<AvailabilityProps> = ({
  availabilities: av,
  availabilityTitle = 'Availabilities',
  date,
  onChange,
}) => {
  const utils = useUtils();
  const classes = useStyles();

  const [selectedDate, handleDateChange] = useState(new Date());
  const [availabilities, setAvailabilities] = useState(av.length > 0 ? av : []);
  console.log(availabilities);
  return (
    <div className={classes.container}>
      <div>
        <h3 className={classes.header}>{availabilityTitle}</h3>
      </div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {availabilities.map((availability, index) => {
          return (
            <Grid container key={index} spacing={2} className={classes.itemList}>
              <Grid item md={4}>
                <TimePicker
                  clearable
                  label="Start Time"
                  value={availability.startTime}
                  onChange={date => {
                    setAvailabilities(prev => {
                      const newAvailabilities = [...prev];
                      newAvailabilities[index].startTime = date;
                      return newAvailabilities;
                    });
                  }}
                />
              </Grid>
              <Grid item md={4}>
                <TimePicker
                  clearable
                  label="End Time"
                  value={availability.endTime}
                  minDate={new Date(availability.startTime as any)}
                  minDateMessage="End time should be after start time"
                  // onError={console.log}
                  onChange={date => {
                    if (utils.isBefore(date, new Date(availability.startTime as any))) {
                      return null;
                    }
                    setAvailabilities(prev => {
                      const newAvailabilities = [...prev];
                      newAvailabilities[index].endTime = date;
                      return newAvailabilities;
                    });
                  }}
                />
              </Grid>
              <Grid item md={4} container>
                <Button
                  color="primary"
                  onClick={() => {
                    const newAvailabilities = [...availabilities];
                    newAvailabilities.splice(index, 1);
                    setAvailabilities(newAvailabilities);
                  }}
                >
                  <TrashIcon />
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </MuiPickersUtilsProvider>

      <div className={classes.addContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const startTime = new Date(new Date().setHours(0, 0, 0, 0));
            const endTime = new Date(new Date(startTime).setHours(1, 0, 0, 0));
            setAvailabilities([
              ...availabilities,
              {
                startTime,
                endTime,
              },
            ]);
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
