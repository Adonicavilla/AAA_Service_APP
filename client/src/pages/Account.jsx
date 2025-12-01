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
                <li key={o.id} style={{marginBottom:16, padding:'1rem', background:'var(--bg-color)', borderRadius:8}}>
                  <div className="order-item-details">
                    <span className="order-item-title" style={{fontSize:'1.125rem', fontWeight:'600'}}>{o.restaurant || o.title}</span>
                    <span className="order-item-date">{new Date(o.date).toLocaleString()}</span>
                  </div>
                  {o.itemsList && (
                    <div style={{marginTop:8,fontSize:'0.875rem',color:'var(--text-muted-color)'}}>
                      📦 {o.itemsList}
                    </div>
                  )}
                  {o.totalAmount && (
                    <div style={{marginTop:6,fontSize:'1rem',fontWeight:'600',color:'var(--primary-color)'}}>
                      Total: ${o.totalAmount.toFixed(2)}
                    </div>
                  )}
                  <div style={{marginTop:6,fontSize:'0.875rem',color:'var(--text-muted-color)'}}>
                    📍 {o.address}
                  </div>
                  {o.notes && (
                    <div style={{marginTop:6,fontSize:'0.875rem',color:'var(--text-muted-color)',fontStyle:'italic'}}>
                      Note: {o.notes}
                    </div>
                  )}
                  <div style={{marginTop:8}}>
                    <span className="badge outline" style={{background: o.status === 'Pending' ? 'orange' : 'green', color: 'white'}}>{o.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
