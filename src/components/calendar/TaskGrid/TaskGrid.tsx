import { FC } from 'react'
import s from './TaskGrid.module.scss'
import { hours, minutes } from 'utils/constsTimes.ts'
import { IEvents } from 'models/IEvents.ts'
import { UseTaskGrid, Modal } from '../index.ts'

interface TaskGridProps {
  selectedWeek: Date
  events: IEvents[]
}

export const TaskGrid: FC<TaskGridProps> = ({ selectedWeek, events }) => {
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(selectedWeek)
    day.setDate(selectedWeek.getDate() + i)
    return day
  })

  const filterEventsByDayAndTime = (day: Date) => {
    const formattedDay = day.toISOString().split('T')[0]
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      const eventDateString = eventDate.toISOString().split('T')[0]
      return eventDateString === formattedDay
    })
  }

  const { showModal, formType, openForm, setFormType, setShowModal } =
    UseTaskGrid()

  return (
    <div className={s.task}>
      {days.map((day) => (
        <div key={day.toISOString()} className={s.day}>
          {filterEventsByDayAndTime(day).map((event) => {
            const eventStart = event.start_time.split(':')
            const eventEnd = event.end_time.split(':')
            const eventTopPosition =
              parseInt(eventStart[0]) * 60 + parseInt(eventStart[1]) - 8 * 60
            const eventStartTime =
              parseInt(eventStart[0]) * 60 + parseInt(eventStart[1]) - 8 * 60
            const eventEndTime =
              parseInt(eventEnd[0]) * 60 + parseInt(eventEnd[1]) - 8 * 60
            const eventHeight = eventEndTime - eventStartTime

            const eventStyle = {
              top: `${eventTopPosition}px`,
              height: `${eventHeight}px`,
            }

            return (
              <div
                key={event.id}
                className={s.event}
                style={eventStyle}
                onClick={() => openForm('view')}
              >
                {event.service_name}
              </div>
            )
          })}
          {hours.map((hour) => (
            <div key={hour} className={s.hour}>
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className={s.minutes}
                  onClick={() => openForm('create')}
                ></div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        formType={formType}
        setFormType={setFormType}
      />
    </div>
  )
}
