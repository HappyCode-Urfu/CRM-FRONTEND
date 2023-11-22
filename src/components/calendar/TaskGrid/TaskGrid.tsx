import { FC, useMemo, useState } from 'react'
import s from './TaskGrid.module.scss'
import { hours, minutes } from 'utils/constsTimes.ts'
import { IEvents } from 'models/IEvents.ts'
import { UseTaskGrid, Modal } from '../index.ts'

interface TaskGridProps {
  selectedWeek: Date
  events: IEvents[]
}

export const TaskGrid: FC<TaskGridProps> = ({ selectedWeek, events }) => {
  const [lastHoveredTime, setLastHoveredTime] = useState<string | null>(null)
  const [hoveredTime, setHoveredTime] = useState<string | number | null>(null)
  const [hoveredColumn, setHoveredColumn] = useState<Date | null>(null)

  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(selectedWeek)
      day.setDate(selectedWeek.getDate() + i)
      return day
    })
  }, [selectedWeek])

  const filterEventsByDayAndTime = useMemo(() => {
    return (day: Date) => {
      const formattedDay = day.toISOString().split('T')[0]
      return events.filter((event) => {
        const eventDate = new Date(event.date)
        const eventDateString = eventDate.toISOString().split('T')[0]
        return eventDateString === formattedDay
      })
    }
  }, [events])

  const handleHover = (hour: number, minute: number, column: Date) => {
    const formattedHour = hour.toString().padStart(2, '0')
    const formattedMinute = (minute * 10).toString().padStart(2, '0')
    setHoveredTime(`${formattedHour}:${formattedMinute}`)
    setLastHoveredTime(`${formattedHour}:${formattedMinute}`)
    setHoveredColumn(column)
  }

  const { taskId, showModal, formType, openForm, setFormType, setShowModal } =
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
                onClick={() => openForm('view', event.id)}
              >
                <p className={s.name}>{event.service_name}</p>
                <p className={s.time}>
                  {event.start_time} - {event.end_time}
                </p>
              </div>
            )
          })}
          {hours.map((hour) => (
            <div key={hour} className={s.hour}>
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className={s.minutes}
                  onMouseEnter={() => handleHover(hour, minute, day)}
                  onMouseLeave={() => {
                    setHoveredTime(null)
                    setHoveredColumn(null)
                  }}
                  onClick={() => openForm('create')}
                >
                  {hoveredTime ===
                    `${hour.toString().padStart(2, '0')}:${(minute * 10)
                      .toString()
                      .padStart(2, '0')}` &&
                    day === hoveredColumn && (
                      <div className={s.timeIndicator}>
                        {`${hour.toString().padStart(2, '0')}:${(minute * 10)
                          .toString()
                          .padStart(2, '0')}`}
                      </div>
                    )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <Modal
        id={taskId}
        showModal={showModal}
        setShowModal={setShowModal}
        formType={formType}
        hoveredTime={lastHoveredTime}
        hoveredColumn={hoveredColumn?.toISOString().split('T')[0]}
        setFormType={setFormType}
      />
    </div>
  )
}
