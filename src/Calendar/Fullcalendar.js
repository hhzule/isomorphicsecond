import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { firestore } from '../firebase';
import timeGridPlugin from "@fullcalendar/timegrid"
import { useAuth } from "../contexts/AuthContext"
const events = [{ title: "Today", add: "wow", date: new Date("2021-02-02") }];

const Fullcalendar = ({ city, start, end }) => {
    const [event, setEvent] = useState();
    const { currentUser } = useAuth();
    useEffect(() => {

        const fetchdash = async () => {

            await firestore.collection(currentUser.uid + `/${city}/calendar`).onSnapshot((snap) => {

                const newdata = snap.docs.map((doc) => (

                    {
                        id: doc.id,
                        title: doc.data().title,
                        date: new Date(doc.data().dat)

                    }
                )
                )

                setEvent(newdata)

            })
        }


        fetchdash();
    }, [])

    // const handleDel = async (id) => {
    //     try {

    //         await firestore.collection(currentUser.uid + `/${city}/calendar`).doc(id).delete()
    //     } catch (e) {
    //         console.log("Failed to delete " + e.message);
    //     }
    // }

    function renderEventContent(eventInfo) {

        return (
            <>
                {/* <button onClick={() => handleDel(eventInfo.event.id)}>del</button> */}
                <i>{eventInfo.event.title}</i>
            </>
        )
    }
    console.log(start, "event")


    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView='dayGrid'
            events={event}
            visibleRange={{
                start: new Date(start),
                end: new Date(end)
            }}

            eventContent={renderEventContent}
        // eventAdd={ }

        />
    )
}
export default Fullcalendar;