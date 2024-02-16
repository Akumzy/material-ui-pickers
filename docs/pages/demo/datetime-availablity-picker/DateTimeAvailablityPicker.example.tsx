import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { MobileDateTimeAvailablityPicker, DateTimePicker } from '@akumzy/material-ui-pickers';

export default function BasicDateTimePicker() {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(null);
  console.log(selectedDate);
  const av = [
    {
      startTime: new Date('2024-02-15T07:50:02.794Z'),
      endTime: new Date('2024-02-15T08:56:02.794Z'),
    },
    {
      startTime: new Date('2024-02-15T07:58:47.842Z'),
      endTime: new Date('2024-02-15T07:58:47.842Z'),
    },
    {
      startTime: new Date('2024-02-15T08:00:34.957Z'),
      endTime: new Date('2024-02-15T08:00:34.957Z'),
    },
    {
      startTime: new Date('2024-02-16T09:30:12.350Z'),
      endTime: new Date('2024-02-16T10:30:12.350Z'),
    },
  ];
  return (
    <React.Fragment>
      <MobileDateTimeAvailablityPicker
        renderInput={(props) => <TextField variant="outlined" {...props} />}
        label="Unavailablity Date and Time Picker"
        value={selectedDate}
        onChange={handleDateChange}
        availabilityTitle="Unavailable Times"
        availabilities={av}
        onAvailabilitiesChange={(newAvailabilities) => {
          console.log('newAvailabilities', newAvailabilities);
        }}
      />
    </React.Fragment>
  );
}
