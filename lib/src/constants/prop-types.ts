import * as PropTypes from 'prop-types';
import { TextFieldProps } from '@material-ui/core/TextField';
import { ChangeEvent } from 'react';

export const date = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Date),
]);

const datePickerView = PropTypes.oneOf(['year', 'month', 'day']);

export type ParsableDate<TDate = unknown> = string | number | Date | null | undefined | TDate;

export const DomainPropTypes = { date, datePickerView };

export const defaultMinDate = new Date('1900-01-01') as unknown;

export const defaultMaxDate = new Date('2099-12-31') as unknown;

export type AvailabilityObject = {
  startTime: Date;
  endTime: Date;
  allDay?: boolean; // default is true
  reason?: string;
};

export type ExtraTextFieldProps = {
  showTextField?: boolean;
  textFieldProps?: TextFieldProps & { onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, selectedDate?: Date | null) => void };
} | undefined;
