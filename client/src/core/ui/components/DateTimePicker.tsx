import * as React from "react";
import { DatePicker, TimePicker } from "antd";
import { DateFormats, TimeFormats } from "../../common/Constants";
import moment from "moment";

export interface State {
  date?: any;
}

export interface Props {
  value?: any;
  translate: any;
  placeholder?: string;
  showToday?: boolean;
  className?: string;
  format?: string;
  onChange?: any;
  onFocus?: any;
  showTime?: boolean;
  disabled?: boolean;
  showTimePicker?: boolean;
}

export default class DateTimePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      date: this.props.value || undefined
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { value } = this.props;
    if (value !== prevState?.date) {
      this.setState({
        date: value
      });
    }
  }

  onChange = (date: any) => {
    this.props.onChange(date);
    this.setState({
      date
    });
  };

  render() {
    const {
      translate,
      placeholder,
      showToday = false,
      className,
      format,
      onFocus,
      showTime = false,
      disabled = false,
      showTimePicker = false
    } = this.props;
    const { date } = this.state;
    const lang = {
      locale: "hr_HR",
      placeholder: translate("date_picker.placeholder"),
      rangePlaceholder: [
        translate("date_picker.start_date"),
        translate("date_picker.end_date")
      ],
      today: translate("date_picker.today"),
      now: translate("date_picker.now"),
      backToToday: translate("date_picker.back_to_today"),
      ok: translate("date_picker.ok"),
      clear: translate("date_picker.clear"),
      month: translate("date_picker.month"),
      year: translate("date_picker.year"),
      timeSelect: translate("date_picker.time_select"),
      dateSelect: translate("date_picker.date_select"),
      monthSelect: translate("date_picker.month_select"),
      yearSelect: translate("date_picker.year_select"),
      decadeSelect: translate("date_picker.decade_select"),
      yearFormat: DateFormats.YEAR,
      dateFormat: DateFormats.DATE,
      dayFormat: DateFormats.DAY,
      dateTimeFormat: DateFormats.DATETIME,
      monthFormat: DateFormats.MONTH,
      monthBeforeYear: true,
      previousMonth: translate("date_picker.previous_month"),
      nextMonth: translate("date_picker.next_month"),
      previousYear: translate("date_picker.previous_year"),
      nextYear: translate("date_picker.next_year"),
      previousDecade: translate("date_picker.previous_decade"),
      nextDecade: translate("date_picker.next_decade"),
      previousCentury: translate("date_picker.previous_century"),
      nextCentury: translate("date_picker.next_century")
    };
    return showTimePicker ? (
      <TimePicker
        locale={{ lang } as any}
        value={date ? moment(date, TimeFormats.LOCAL_TIME) : undefined}
        format={TimeFormats.LOCAL_TIME}
        onChange={this.onChange}
        placeholder={placeholder}
      />
    ) : (
      <DatePicker
        value={date}
        format={format}
        showToday={showToday}
        className={className}
        locale={{ lang } as any}
        onChange={this.props.onChange}
        onFocus={onFocus}
        showTime={showTime}
        disabled={disabled}
        style={{ display: "flex" }}
      />
    );
  }
}
