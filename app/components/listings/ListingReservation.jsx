'use client';
import Button from '../Button';
import Calendar from '../inputs/Calendar'
const ListingReservation = ({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  disabled, 
  disabledDates,
  onSubmit,
}) => {
  return (
    <div className=' bg-white rounded-xl border-[1px] overflow-hidden border-neutral-200'>
        <div className="flex flex-row items-center gap-2 p-4">
            <div className="text-2xl">$ {price}</div>
            <div className=' font-light text-neutral-600'>per night</div>
        </div>
        <hr />
        <Calendar 
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
         />
         <hr />
         <div className=" px-4 py-2">
          <Button
          label="Reserve"
          disabled={disabled}
          onClick={onSubmit} />
         </div>
         <div className=" p-4 flex flex-row items-center justify-between font-semibold text-lg">
              <div>Total</div>
              <div>$ {totalPrice}</div>
         </div>
    </div>
  )
}

export default ListingReservation