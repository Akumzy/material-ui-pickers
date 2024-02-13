import { useUtils } from '../_shared/hooks/useUtils';
import { DateTimeAvailablityPickerToolbar } from './DateTimeAvailablityPickerToolbar';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { ParsableDate, defaultMaxDate, defaultMinDate } from '../constants/prop-types';
import { SharedPickerProps, makePickerWithStateAndWrapper } from '../Picker/makePickerWithState';
import { ExportedClockViewProps } from '../views/Clock/ClockView';
import { OverrideParsableDateProps, useParsedDate } from '../_shared/hooks/date-helpers-hooks';
import { ExportedCalendarViewProps } from '../views/Calendar/CalendarView';
import { AllSharedPickerProps, WithViewsProps } from '../Picker/SharedPickerProps';
import { ValidationProps, makeValidationHook } from '../_shared/hooks/useValidation';
import { DateAndTimeValidationError, validateDateAndTime } from '../DateTimePicker/date-time-utils';
import { DesktopWrapper, MobileWrapper, SomeWrapper, StaticWrapper } from '../wrappers/Wrapper';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';

export type DateTimeAvailablityPickerView =
  | 'year'
  | 'date'
  | 'month'
  | 'hours'
  | 'minutes'
  | 'seconds'
  | 'availability';

type DateTimeAvailablityPickerViewsProps<TDate> = OverrideParsableDateProps<
  TDate,
  ExportedClockViewProps<TDate> & ExportedCalendarViewProps<TDate>,
  'minDate' | 'maxDate' | 'minTime' | 'maxTime'
>;

export interface BaseDateTimeAvailablityPickerProps<TDate>
  extends WithViewsProps<'year' | 'date' | 'month' | 'hours' | 'minutes' | 'availability'>,
    ValidationProps<DateAndTimeValidationError, ParsableDate>,
    DateTimeAvailablityPickerViewsProps<TDate> {
  /**
   * To show tabs.
   */
  hideTabs?: boolean;
  /**
   * Date tab icon.
   */
  dateRangeIcon?: React.ReactNode;
  /**
   * Time tab icon.
   */
  timeIcon?: React.ReactNode;
  /**
   * Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
   */
  minDateTime?: ParsableDate<TDate>;
  /**
   * Minimal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
   */
  maxDateTime?: ParsableDate<TDate>;
  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat?: string;
}

function useInterceptProps({
  ampm,
  inputFormat,
  maxDate: __maxDate = defaultMaxDate,
  maxDateTime: __maxDateTime,
  maxTime: __maxTime,
  minDate: __minDate = defaultMinDate,
  minDateTime: __minDateTime,
  minTime: __minTime,
  openTo = 'date',
  orientation = 'portrait',
  views = ['year', 'date', 'hours', 'minutes'],
  ...other
}: BaseDateTimeAvailablityPickerProps<unknown> & AllSharedPickerProps) {
  const utils = useUtils();
  const minTime = useParsedDate(__minTime);
  const maxTime = useParsedDate(__maxTime);
  const minDate = useParsedDate(__minDate);
  const maxDate = useParsedDate(__maxDate);
  const minDateTime = useParsedDate(__minDateTime);
  const maxDateTime = useParsedDate(__maxDateTime);
  const willUseAmPm = ampm ?? utils.is12HourCycleInCurrentLocale();

  if (orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return {
    openTo,
    views,
    ampm: willUseAmPm,
    ampmInClock: true,
    orientation,
    showToolbar: true,
    showTabs: true,
    allowSameDateSelection: true,
    minDate: minDateTime || minDate,
    minTime: minDateTime || minTime,
    maxDate: maxDateTime || maxDate,
    maxTime: maxDateTime || maxTime,
    disableIgnoringDatePartForTimeValidation: Boolean(minDateTime || maxDateTime),
    acceptRegex: willUseAmPm ? /[\dap]/gi : /\d/gi,
    mask: '__/__/____ __:__',
    disableMaskedInput: willUseAmPm,
    inputFormat: pick12hOr24hFormat(inputFormat, willUseAmPm, {
      localized: utils.formats.keyboardDateTime,
      '12h': utils.formats.keyboardDateTime12h,
      '24h': utils.formats.keyboardDateTime24h,
    }),
    ...other,
  };
}

const useValidation = makeValidationHook<
  DateAndTimeValidationError,
  ParsableDate,
  BaseDateTimeAvailablityPickerProps<unknown>
>(validateDateAndTime);

const dateTimePickerConfig = {
  useInterceptProps,
  useValidation,
  DefaultToolbarComponent: DateTimeAvailablityPickerToolbar,
};

type DateTimeAvailablityPickerComponent<TWrapper extends SomeWrapper> = <TDate>(
  props: BaseDateTimeAvailablityPickerProps<TDate> & SharedPickerProps<TDate, TWrapper>
) => JSX.Element;

export const DateTimeAvailablityPicker = makePickerWithStateAndWrapper<
  BaseDateTimeAvailablityPickerProps<unknown>
>(ResponsiveWrapper, {
  name: 'MuiDateTimeAvailablityPicker',
  ...dateTimePickerConfig,
}) as DateTimeAvailablityPickerComponent<typeof ResponsiveWrapper>;

export type DateTimeAvailablityPickerProps = React.ComponentProps<typeof DateTimeAvailablityPicker>;

export const DesktopDateTimeAvailablityPicker = makePickerWithStateAndWrapper<
  BaseDateTimeAvailablityPickerProps<unknown>
>(DesktopWrapper, {
  name: 'MuiDesktopDateTimeAvailablityPicker',
  ...dateTimePickerConfig,
}) as DateTimeAvailablityPickerComponent<typeof DesktopWrapper>;

export type DesktopDateTimeAvailablityPickerProps = React.ComponentProps<
  typeof DesktopDateTimeAvailablityPicker
>;

export const MobileDateTimeAvailablityPicker = makePickerWithStateAndWrapper<
  BaseDateTimeAvailablityPickerProps<unknown>
>(MobileWrapper, {
  name: 'MuiMobileDateTimeAvailablityPicker',
  ...dateTimePickerConfig,
}) as DateTimeAvailablityPickerComponent<typeof MobileWrapper>;

export type MobileDateTimeAvailablityPickerProps = React.ComponentProps<
  typeof MobileDateTimeAvailablityPicker
>;

export const StaticDateTimeAvailablityPicker = makePickerWithStateAndWrapper<
  BaseDateTimeAvailablityPickerProps<unknown>
>(StaticWrapper, {
  name: 'MuiStaticDateTimeAvailablityPicker',
  ...dateTimePickerConfig,
}) as DateTimeAvailablityPickerComponent<typeof StaticWrapper>;

export type StaticDateTimeAvailablityPickerProps = React.ComponentProps<
  typeof StaticDateTimeAvailablityPicker
>;
