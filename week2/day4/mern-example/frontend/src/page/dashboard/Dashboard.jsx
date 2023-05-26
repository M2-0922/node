import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const user = useSelector(state => state.auth.data);
    console.log(user);
    const { username, email } = user.user;

  return (
    <div>
        <h1>Dashboard</h1>
        {
            user && (
                <div>
                    <p>Username: {username}</p>
                    <p>Email: {email}</p>
                </div>
            )
        }
    </div>
  )
}

export default Dashboard