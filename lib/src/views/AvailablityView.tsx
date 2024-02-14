import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useDefaultProps } from '../_shared/withDefaultProps';
import { useState } from 'react';
import { Button, Grid, TextField, useTheme } from '@material-ui/core';
import { AvailabilityObject } from '../constants/prop-types';
import { MobileTimePicker } from '@akumzy/material-ui-pickers';

import { useNow, useUtils } from '../_shared/hooks/useUtils';
import { TrashIcon } from '../_shared/icons/TrashIcon';
import { ExportedCalendarViewProps } from './Calendar/CalendarView';

export interface AvailabilityProps<TDate> extends ExportedCalendarViewProps<TDate> {
  date: TDate;
  availabilityTitle?: string;
  availabilities?: AvailabilityObject[];
  onAvailabilitiesChange?: (availabilities: AvailabilityObject[]) => void;
}
export type ExportedAvailabilityProps<TDate> = Omit<
  AvailabilityProps<TDate>,
  'date' | 'view' | 'views' | 'onChange' | 'changeView' | 'slideDirection' | 'currentMonth'
>;

const muiComponentConfig = { name: 'MuiPickersAvailabilitySelection' };

export const useStyles = makeStyles(() => {
  return {
    root: {},
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
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
      display: 'flex',
      gap: '0 16px',
      width: '100%',
      paddingBottom: 16,
    },
    header: {
      fontSize: 18,
      paddingLeft: 16,
    },

    rangeTime: {
      flex: 1,
    },
  };
}, muiComponentConfig);

export function Availability<TDate>(props: AvailabilityProps<TDate>) {
  const {
    date,
    onAvailabilitiesChange,
    availabilities: av = [],
    availabilityTitle = 'Availability',
  } = useDefaultProps(props, muiComponentConfig);
  const now = useNow<TDate>();
  const utils = useUtils<TDate>();
  const theme = useTheme();
  const classes = useStyles();

  const [selectedDate, handleDateChange] = useState(new Date());
  const [availabilities, setAvailabilities] = useState<AvailabilityObject[]>(
    av?.length > 0 ? av : []
  );

  return (
    <div className={classes.container}>
      <div>
        <h3 className={classes.header}>{availabilityTitle}</h3>
      </div>

      {availabilities.map((availability, index) => {
        return (
          <div key={index} className={classes.itemList}>
            <div className={classes.rangeTime}>
              <MobileTimePicker
                ampmInClock
                renderInput={(props) => <TextField {...props} />}
                label="Start Time"
                value={availability.startTime}
                onChange={(date) => {
                  setAvailabilities((prev) => {
                    const newAvailabilities = [...prev];
                    newAvailabilities[index].startTime = date;
                    return newAvailabilities;
                  });
                }}
              />
            </div>
            <div className={classes.rangeTime}>
              <MobileTimePicker
                ampmInClock
                renderInput={(props) => <TextField {...props} />}
                label="End Time"
                value={availability.endTime}
                minTime={new Date(availability.startTime as any)}
                onChange={(date: any) => {
                  if (utils.isBefore(date, availability.startTime as any)) {
                    return null;
                  }
                  setAvailabilities((prev) => {
                    const newAvailabilities = [...prev];
                    newAvailabilities[index].endTime = date;
                    return newAvailabilities;
                  });
                }}
              />
            </div>

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
          </div>
        );
      })}

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
}
