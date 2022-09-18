/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { StyledCalendarCell } from './styled'
import workingDayIcon from '../../../assets/work.svg'
import sickDayIcon from '../../../assets/sick.svg'
import palmDayIcon from '../../../assets/palm.svg'
import sandClock from '../../../assets/sandclock.svg'
import { PropsWithChildren, useState } from 'react'
import { useAppDispatch, useAppSelector } from './../../../redux/reduxHooks'
import { togglePopup } from '../../../redux/slices/app-slice'
import { log } from 'console'

export interface DayObjectProps {
  dayObject: {
    month: number
    dayIndex: number
    day: number
    hDay: boolean
    activity: null | 1 | 2 | 3 | 4
    extra: number
    money: number
    i: number
  }
}

function CalendarCell ({ dayObject, children }: DayObjectProps & PropsWithChildren): JSX.Element {
  const isDay = !Number.isNaN(dayObject.day)
  const dayData = useAppSelector(state => state.calendar.calendar[dayObject.month][dayObject.i])
  const { activity: activityType, extra } = dayData
  const dispatch = useAppDispatch()
  const handlerCellOnClick = (): void => {
    console.log(dayData)
    console.log(dayObject)

    dispatch(togglePopup({
      data: {
        currActivity: dayObject.activity,
        currDay: dayObject.day,
        currDayIndex: dayObject.dayIndex,
        currExtra: dayObject.extra,
        currHDay: dayObject.hDay,
        currMoney: dayObject.money,
        currMonth: dayObject.month,
        currI: dayObject.i
      },
      isOpen: true
    }))
  }

  return (
    <StyledCalendarCell aria-label='Настройки дня' onClick={handlerCellOnClick} isHday={dayObject.hDay} isDay={isDay}>
      {children}
      {activityType === 1 ? <img width="20" height="20" src={workingDayIcon} alt="working day" /> : null}
      {activityType === 2 ? <img width="20" height="20" src={sickDayIcon} alt="sick day" /> : null}
      {activityType === 3 ? <img width="20" height="20" src={palmDayIcon} alt="vocation day" /> : null}
      {activityType === 4 ? <img width="20" height="20" src={sandClock} alt="waiting day" /> : null}

      {extra !== null && activityType === 1 ? <span className="extraHours">+{extra}</span> : null}
    </StyledCalendarCell>
  )
}
export default CalendarCell
