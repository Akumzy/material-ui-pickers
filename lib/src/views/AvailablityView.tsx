import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useDefaultProps } from '../_shared/withDefaultProps';
import { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { AvailabilityObject } from '../constants/prop-types';
import { MobileTimePicker } from '@akumzy/material-ui-pickers';

import { useUtils } from '../_shared/hooks/useUtils';
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
      marginTop: 0,
      marginBottom: 16,
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

  const utils = useUtils<TDate>();
  const classes = useStyles();

  const [availabilities, setAvailabilities] = useState<AvailabilityObject[]>(
    av?.length > 0 ? av : []
  );

  const { sameDayAv, differentDayAv } = React.useMemo(() => {
    const sameDayAv: AvailabilityObject[] = [];
    const differentDayAv: AvailabilityObject[] = [];

    availabilities.forEach((availability) => {
      if (utils.isSameDay(availability.startTime as any, date)) {
        sameDayAv.push(availability);
      } else {
        differentDayAv.push(availability);
      }
    });

    return { sameDayAv, differentDayAv };
  }, [availabilities]);
  const handleAvailabilitiesChange = (newSameDayAv: AvailabilityObject[]) => {
    const newAvailabilities = [...differentDayAv, ...newSameDayAv];
    setAvailabilities(newAvailabilities);
    onAvailabilitiesChange?.(newAvailabilities);
  };
  return (
    <div className={classes.container}>
      <h3 className={classes.header}>{availabilityTitle}</h3>

      {date &&
        sameDayAv.map((availability, index) => {
          return (
            <div key={index} className={classes.itemList}>
              <div className={classes.rangeTime}>
                <MobileTimePicker
                  ampmInClock
                  renderInput={(props) => <TextField {...props} />}
                  label="Start Time"
                  value={availability.startTime}
                  onChange={(date) => {
                    if (!date) return;
                    const clonedSameDayAv = [...sameDayAv];
                    clonedSameDayAv[index].startTime = date;
                    handleAvailabilitiesChange(clonedSameDayAv);
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
                    const clonedSameDayAv = [...sameDayAv];
                    clonedSameDayAv[index].endTime = date;
                    handleAvailabilitiesChange(clonedSameDayAv);
                  }}
                />
              </div>

              <Button
                color="primary"
                onClick={() => {
                  const clonedSameDayAv = [...sameDayAv];
                  clonedSameDayAv.splice(index, 1);
                  handleAvailabilitiesChange(clonedSameDayAv);
                }}
              >
                <TrashIcon />
              </Button>
            </div>
          );
        })}
      {date ? (
        <div className={classes.addContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const newDate = (date || new Date()) as Date;
              const newAvailabilities = [
                ...availabilities,
                {
                  startTime: newDate,
                  endTime: newDate,
                },
              ];
              setAvailabilities(newAvailabilities);
              onAvailabilitiesChange?.(newAvailabilities);
            }}
          >
            Add
          </Button>
        </div>
      ) : (
        <div className={classes.loadingContainer}>Please select a date</div>
      )}
    </div>
  );
}
