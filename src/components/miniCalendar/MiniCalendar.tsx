import s from './MiniCalendar.module.scss'
import { useCalendar } from 'components/miniCalendar/hooks/useMiniCalendr.ts'
import { checkDateIsEqual, checkIsToday } from 'utils/date'

interface CalendarProps {
  locale?: string
  selectedDate: Date
  selectDate: (date: Date) => void
  firstWeekDayNumber?: number
}

export const MiniCalendar: React.FC<CalendarProps> = ({
  locale = 'default',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2,
}) => {
  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber,
  })
  return (
    <div className={s.calendar}>
      <div className={s.calendar__header}>
        <div
          aria-hidden
          className={s.calendar__header__arrow__left}
          onClick={() => functions.onClickArrow('left')}
        />
        {state.mode === 'days' && (
          <div aria-hidden onClick={() => functions.setMode('monthes')}>
            {state.monthesNames[state.selectedMonth.monthIndex].month}{' '}
            {state.selectedYear}
          </div>
        )}
        {state.mode === 'monthes' && (
          <div aria-hidden onClick={() => functions.setMode('years')}>
            {state.selectedYear}
          </div>
        )}
        {state.mode === 'years' && (
          <div>
            {state.selectedYearsInterval[0]} -{' '}
            {
              state.selectedYearsInterval[
                state.selectedYearsInterval.length - 1
              ]
            }
          </div>
        )}
        <div
          aria-hidden
          className={s.calendar__header__arrow__right}
          onClick={() => functions.onClickArrow('right')}
        />
      </div>
      <div className={s.calendar__body}>
        {state.mode === 'days' && (
          <>
            <div className={s.calendar__week__names}>
              {state.weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className={s.calendar__days}>
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date)
                const isSelectedDay = checkDateIsEqual(
                  day.date,
                  state.selectedDay.date
                )
                const isAdditionalDay =
                  day.monthIndex !== state.selectedMonth.monthIndex

                return (
                  <div
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    aria-hidden
                    onClick={() => {
                      functions.setSelectedDay(day)
                      selectDate(day.date)
                    }}
                    className={[
                      `${s.calendar__day}`,
                      isToday ? `${s.calendar__today__item}` : '',
                      isSelectedDay ? `${s.calendar__selected__item}` : '',
                      isAdditionalDay ? `${s.calendar__additional__day}` : '',
                    ].join(' ')}
                  >
                    {day.dayNumber}
                  </div>
                )
              })}
            </div>
          </>
        )}

        {state.mode === 'monthes' && (
          <div className={s.calendar__pick__items__container}>
            {state.monthesNames.map((monthesName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthesName.monthIndex &&
                state.selectedYear === new Date().getFullYear()
              const isSelectedMonth =
                monthesName.monthIndex === state.selectedMonth.monthIndex

              return (
                <div
                  key={monthesName.month}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthesName.monthIndex)
                    functions.setMode('days')
                  }}
                  className={[
                    `${s.calendar__pick__item}`,
                    isSelectedMonth ? `${s.calendar__selected__item}` : '',
                    isCurrentMonth ? `${s.calendar__today__item}` : '',
                  ].join(' ')}
                >
                  {monthesName.monthShort}
                </div>
              )
            })}
          </div>
        )}

        {state.mode === 'years' && (
          <div className={s.calendar__pick__items__container}>
            <div className={s.calendar__unchoosable__year}>
              {state.selectedYearsInterval[0] - 1}
            </div>
            {state.selectedYearsInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year
              const isSelectedYear = year === state.selectedYear

              return (
                <div
                  key={year}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedYear(year)
                    functions.setMode('monthes')
                  }}
                  className={[
                    `${s.calendar__pick__item}`,
                    isCurrentYear ? `${s.calendar__today__item}` : '',
                    isSelectedYear ? `${s.calendar__selected__item}` : '',
                  ].join(' ')}
                >
                  {year}
                </div>
              )
            })}
            <div className={s.calendar__unchoosable__year}>
              {state.selectedYearsInterval[
                state.selectedYearsInterval.length - 1
              ] + 1}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
