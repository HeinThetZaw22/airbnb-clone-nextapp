'use client';
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
    value: Range;
    disabledDates?: Date[];
    onChange: (value: RangeKeyDict) => void;
}

const Calendar: React.FC<CalendarProps> = ({
    value, 
    disabledDates, 
    onChange
}) => {
    return (
        <DateRange
            rangeColors={["#262626"]}
            date={new Date()}
            ranges={[value]}
            onChange={onChange}
            disabledDates={disabledDates}
            direction="vertical"
            showDateDisplay={false}
            minDate={ new Date()}
            />
    )
}

export default Calendar