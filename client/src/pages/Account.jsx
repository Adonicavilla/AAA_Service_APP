import React, { useEffect, useState } from 'react'

export default function Account(){
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(stored)
  },[])

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">My Account</h1>
        <p className="page-subtitle">Manage your profile and orders.</p>
      </div>

      <div className="account-container">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Order History</h3>
          </div>
          <div className="card-content">
            <ul className="order-list">
              {orders.length === 0 && <li>No recent orders.</li>}
              {orders.map(o => (
                <li key={o.id} style={{marginBottom:12}}>
                  <div className="order-item-details">
                    <span className="order-item-title">{o.restaurant || o.title}</span>
                    <span className="order-item-date">{new Date(o.date).toLocaleString()}</span>
                  </div>
                  <div style={{marginTop:6,fontSize:'0.95rem',color:'var(--text-muted-color)'}}>{o.address}{o.notes ? ' · ' + o.notes : ''}</div>
                  <div style={{marginTop:6,fontWeight:600}}>{o.status}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
