import api from '../../utils/api'

import { useState, useEffect } from 'react'

function Dashboard() {

    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')


    useEffect(() => {
        api
            .get('/users/dashboard', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                setUser(response.data)
            })
    }, [token])


    return (
        <div>Dashboard</div>
    )        

    
}

export default Dashboard