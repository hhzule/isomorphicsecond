import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"

const events = [{ title: "Today", add: "here", date: new Date('2020-03-22') }];
function renderEventContent(eventInfo) {
    // console.log(eventInfo)
    return (
        <>
            <button>click</button>
            <i>{eventInfo.event.extendedProps.add}</i>
            <i>{eventInfo.event.title}</i>
        </>
    )
}
const Fullcalendar = () => {



    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView='dayGrid'
            events={events}
            visibleRange={{
                start: '2020-03-22',
                end: '2020-03-29'
            }}

            eventContent={renderEventContent}
        // eventAdd={ }

        />
    )
}
export default Fullcalendar;