import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { MobileDateTimeAvailablityPicker, DateTimePicker } from '@akumzy/material-ui-pickers';

export default function BasicDateTimePicker() {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(new Date());

  return (
    <React.Fragment>
      <MobileDateTimeAvailablityPicker
        renderInput={(props) => <TextField variant="outlined" {...props} />}
        label="Unavailablity Date and Time Picker"
        value={selectedDate}
        onChange={handleDateChange}
        availabilityTitle="Unavailable Times"
      />
    </React.Fragment>
  );
}
