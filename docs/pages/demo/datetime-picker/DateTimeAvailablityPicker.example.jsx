import React, { Fragment, useState } from 'react';
import { DateTimeAvailablityPicker } from '@material-ui/pickers';

function BasicDateTimeAvailablityPicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DateTimeAvailablityPicker
        label="DateTimeAvailablityPicker"
        inputVariant="outlined"
        value={selectedDate}
        onChange={handleDateChange}
      />

      <DateTimeAvailablityPicker
        autoOk
        ampm={false}
        disableFuture
        value={selectedDate}
        onChange={handleDateChange}
        label="24h clock"
      />

      <DateTimeAvailablityPicker
        value={selectedDate}
        disablePast
        onChange={handleDateChange}
        label="With Today Button"
        showTodayButton
      />
    </Fragment>
  );
}

export default BasicDateTimeAvailablityPicker;
