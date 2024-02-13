import { useUtils } from '../_shared/hooks/useUtils';
import { PureDateInput } from '../_shared/PureDateInput';
import { BaseTimePickerProps } from '../TimePicker/TimePicker';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { DateTimeAvailablityPickerToolbar } from './DateTimeAvailablityPickerToolbar';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { dateTimePickerDefaultProps } from '../constants/prop-types';
import { useKeyboardPickerState } from '../_shared/hooks/useKeyboardPickerState';
import {
  WithKeyboardInputProps,
  makePickerWithState,
  WithPureInputProps,
} from '../Picker/makePickerWithState';

export type DateTimeAvailablityPickerView =
  | 'year'
  | 'date'
  | 'month'
  | 'hours'
  | 'minutes'
  | 'availability';

export type BaseDateTimeAvailablityPickerProps = BaseTimePickerProps & BaseDatePickerProps;

export interface DateTimeAvailablityPickerViewsProps extends BaseDateTimeAvailablityPickerProps {
  /** Array of views to show */
  views?: ('year' | 'date' | 'month' | 'hours' | 'minutes' | 'availability')[];
  /** First view to show in DatePicker */
  openTo?: 'year' | 'date' | 'month' | 'hours' | 'minutes' | 'availability';
  /** To show tabs */
  hideTabs?: boolean;
  /** Date tab icon */
  dateRangeIcon?: React.ReactNode;
  /** Time tab icon */
  timeIcon?: React.ReactNode;
}

export type DateTimeAvailablityPickerProps = WithPureInputProps &
  DateTimeAvailablityPickerViewsProps;

export type KeyboardDateTimeAvailablityPickerProps = WithKeyboardInputProps &
  DateTimeAvailablityPickerViewsProps;

const defaultProps = {
  ...dateTimePickerDefaultProps,
  wider: true,
  orientation: 'portrait' as const,
  openTo: 'date' as DateTimeAvailablityPickerView,
  views: ['year', 'date'] as DateTimeAvailablityPickerView[],
};

function useOptions(
  props: DateTimeAvailablityPickerProps | KeyboardDateTimeAvailablityPickerProps
) {
  const utils = useUtils();

  if (props.orientation !== 'portrait') {
    throw new Error(
      'We are not supporting custom orientation for DateTimeAvailablityPicker yet :('
    );
  }

  return {
    getDefaultFormat: () =>
      pick12hOr24hFormat(props.format, props.ampm, {
        '12h': utils.dateTime12hFormat,
        '24h': utils.dateTime24hFormat,
      }),
  };
}

export const DateTimeAvailablityPicker = makePickerWithState<DateTimeAvailablityPickerProps>({
  useOptions,
  Input: PureDateInput,
  useState: usePickerState,
  DefaultToolbarComponent: DateTimeAvailablityPickerToolbar,
});

export const KeyboardDateTimeAvailablityPicker = makePickerWithState<
  KeyboardDateTimeAvailablityPickerProps
>({
  useOptions,
  Input: KeyboardDateInput,
  useState: useKeyboardPickerState,
  DefaultToolbarComponent: DateTimeAvailablityPickerToolbar,
  getCustomProps: props => ({
    refuse: props.ampm ? /[^\dap]+/gi : /[^\d]+/gi,
  }),
});

DateTimeAvailablityPicker.defaultProps = defaultProps;

KeyboardDateTimeAvailablityPicker.defaultProps = defaultProps;
