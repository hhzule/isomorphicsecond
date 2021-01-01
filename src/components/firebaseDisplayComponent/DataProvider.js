import React, { createContext, useContext, useState, useEffect } from 'react'
import { firestore } from '../../firebase';
import { useAuth } from "../../contexts/AuthContext"
const dataContext = createContext()

export const useData = () => {
    return useContext(dataContext)
}

const DataProvider = ({ children }) => {
    const [time, setTime] = useState([]);

    // const [cal, setCal] = useState([]);
    // const [loading, setLoading] = useState(true)
    const { currentUser } = useAuth()
    const alldata = []
    useEffect(() => {
        const fetch = async () => {
            if (currentUser)
                await firestore.collection(currentUser.uid).onSnapshot((snap) => {

                    const newtime = snap.docs.map((doc) => (
                        {
                            id: doc.id,
                            dash: doc.data()
                        }
                    )
                    )
                    setTime(newtime)

                    // setLoading(false)
                })

        }
        fetch();

    }, [currentUser])


    return (
        <dataContext.Provider value={{ time }}>  {children}</dataContext.Provider>
    )
}

export default DataProvider
