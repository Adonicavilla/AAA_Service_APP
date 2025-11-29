import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import { useNavigate, useLocation } from 'react-router-dom'

const RESTAURANTS = [
  { id: 'pizza-palace', name: 'Pizza Palace', eta: '25-35 min', price: '$$', rating: 4.5 },
  { id: 'sushi-central', name: 'Sushi Central', eta: '30-40 min', price: '$$$', rating: 4.8 },
  { id: 'burger-barn', name: 'Burger Barn', eta: '20-30 min', price: '$', rating: 4.2 },
  { id: 'taco-town', name: 'Taco Town', eta: '25-35 min', price: '$$', rating: 4.6 }
]

export default function Delivery(){
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()
  const [restaurant, setRestaurant] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' })

  function openModal(rest){
    setRestaurant(rest)
    const profile = JSON.parse(localStorage.getItem('userProfile') || 'null')
    setForm({
      name: profile?.name || '',
      phone: profile?.phone || '',
      address: profile?.address || '',
      notes: ''
    })
    setModalOpen(true)
  }

  // If a restaurant id is provided in the URL query string, preselect and open modal
  const location = useLocation()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const rid = params.get('restaurant')
    if (rid) {
      const found = RESTAURANTS.find(x => x.id === rid)
      if (found) {
        setRestaurant(found)
        setModalOpen(true)
        // remove query to avoid re-triggering if user navigates inside app
        try {
          const url = new URL(window.location.href)
          url.searchParams.delete('restaurant')
          window.history.replaceState({}, '', url.toString())
        } catch (e) {}
      }
    }
  }, [location.search])

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function confirmOrder(){
    if(!form.name || !form.phone || !form.address){
      announce('Please provide your name, phone and delivery address.')
      // focus first empty field
      if (!form.name) document.getElementsByName('name')[0]?.focus()
      else if (!form.phone) document.getElementsByName('phone')[0]?.focus()
      else if (!form.address) document.getElementsByName('address')[0]?.focus()
      return
    }

    const order = {
      id: 'ord_' + Date.now(),
      restaurant: restaurant.name,
      name: form.name,
      phone: form.phone,
      address: form.address,
      notes: form.notes,
      status: 'Pending',
      date: new Date().toISOString()
    }

    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.unshift(order)
    localStorage.setItem('orders', JSON.stringify(orders))
      setModalOpen(false)
      announce('Order placed. You can view it in Account Order History.')
      setTimeout(() => navigate('/account'), 700)
  }

    function announce(message) {
      const el = document.getElementById('aria-live')
      if (el) {
        el.textContent = ''
        setTimeout(() => { el.textContent = message }, 50)
      } else {
        // fallback
        window.alert(message)
      }
    }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Order Food Delivery</h1>
        <p className="page-subtitle">Discover delicious meals from your favorite local restaurants.</p>
      </div>

      <div className="card-grid">
        {RESTAURANTS.map(r => (
          <div className="card" key={r.id}>
            <div className="card-image-container"><img src={`https://placehold.co/600x400.png`} alt={r.name} /></div>
            <div className="card-content">
              <h3 className="card-title">{r.name}</h3>
              <span className="badge outline">{r.eta} · {r.price}</span>
              <p className="card-description">Rating: {r.rating}</p>
            </div>
            <div className="card-footer">
              <button className="button primary full-width" onClick={() => openModal(r)}>Order Now</button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={`Order from ${restaurant?.name}`} description={`Order form dialog for ${restaurant?.name}`}>
          <div style={{marginBottom:8}}>
            <label htmlFor="order-name" style={{display:'block',fontSize:'0.875rem',marginBottom:4}}>Name</label>
            <input id="order-name" name="name" value={form.name} onChange={handleChange} className="form-input" />
          </div>
          <div style={{marginBottom:8}}>
            <label htmlFor="order-phone" style={{display:'block',fontSize:'0.875rem',marginBottom:4}}>Phone</label>
            <input id="order-phone" name="phone" value={form.phone} onChange={handleChange} className="form-input" />
          </div>
          <div style={{marginBottom:8}}>
            <label htmlFor="order-address" style={{display:'block',fontSize:'0.875rem',marginBottom:4}}>Address</label>
            <input id="order-address" name="address" value={form.address} onChange={handleChange} className="form-input" />
          </div>
          <div style={{marginBottom:8}}>
            <label htmlFor="order-notes" style={{display:'block',fontSize:'0.875rem',marginBottom:4}}>Notes</label>
            <textarea id="order-notes" name="notes" value={form.notes} onChange={handleChange} className="form-input" style={{minHeight:80}} />
          </div>
          <Modal.Actions className="mt-2">
            <button className="button" onClick={() => setModalOpen(false)} aria-label="Cancel order">Cancel</button>
            <button className="button primary" onClick={confirmOrder} aria-label="Confirm order">Confirm Order</button>
          </Modal.Actions>
        </Modal>
      )}
    </div>
  )
}
