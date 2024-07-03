'use client';
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Calendar = ({value, disabledDates, onChange}) => {
    return (

        <DateRange
            rangeColors={["#262626"]}
            data={ new Date()}
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