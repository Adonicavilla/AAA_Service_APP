import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Checkout(){
  const navigate = useNavigate()
  const [cart, setCart] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' })

  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem('cartDraft') || 'null')
    if(!draft){
      // no draft — go back to delivery
      navigate('/delivery')
      return
    }
    setCart(draft)
    const profile = JSON.parse(localStorage.getItem('userProfile') || 'null')
    setForm({
      name: profile?.name || '',
      phone: profile?.phone || '',
      address: profile?.address || '',
      notes: ''
    })
  }, [])

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function announce(message){
    const el = document.getElementById('aria-live')
    if(el){ el.textContent = ''; setTimeout(() => el.textContent = message, 50) }
    else { try{ window.alert(message) }catch(e){} }
  }

  function finalizeOrder(){
    if(!cart) return
    if(!form.name || !form.phone || !form.address){
      announce('Please provide your name, phone and delivery address.')
      if (!form.name) document.getElementsByName('name')[0]?.focus()
      else if (!form.phone) document.getElementsByName('phone')[0]?.focus()
      else if (!form.address) document.getElementsByName('address')[0]?.focus()
      return
    }

    const order = {
      id: 'ord_' + Date.now(),
      restaurant: cart.restaurantName,
      items: cart.items,
      subtotal: cart.subtotal,
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
    localStorage.removeItem('cartDraft')
    announce('Order placed. You can view it in Account Order History.')
    setTimeout(() => navigate('/account'), 700)
  }

  if(!cart) return null

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Checkout</h1>
        <p className="page-subtitle">Review your selection and provide delivery details.</p>
      </div>

      <div style={{maxWidth:720,margin:'0 auto'}}>
        <section style={{marginBottom:16}}>
          <h3 style={{marginTop:0}}>From: {cart.restaurantName}</h3>
          <div style={{border:'1px solid #eee',padding:12,borderRadius:6}}>
            {cart.items.map(it => (
              <div key={it.id} style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}>
                <div>{it.name} × {it.qty}</div>
                <div>${(it.price * it.qty).toFixed(2)}</div>
              </div>
            ))}
            <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #eee',paddingTop:8,marginTop:8,fontWeight:700}}>
              <div>Subtotal</div>
              <div>${cart.subtotal.toFixed(2)}</div>
            </div>
          </div>
        </section>

        <section style={{marginBottom:16}}>
          <h3 style={{marginTop:0}}>Delivery Details</h3>
          <div style={{marginBottom:8}}>
            <label htmlFor="checkout-name" style={{display:'block',fontSize:'0.875rem',marginBottom:4}}>Name</label>
            <input id="checkout-name" name="name" value={form.name} onChange={handleChange} className="form-input" />
          </div>
          <div style={{marginBottom:8}}>
            <label htmlFor="checkout-phone" style={{display:'block',fontSize:'0.875rem',marginBottom:4}}>Phone</label>
            <input id="checkout-phone" name="phone" value={form.phone} onChange={handleChange} className="form-input" />
          </div>
          <div style={{marginBottom:8}}>
            <label htmlFor="checkout-address" style={{display:'block',fontSize:'0.875rem',marginBottom:4}}>Address</label>
            <input id="checkout-address" name="address" value={form.address} onChange={handleChange} className="form-input" />
          </div>
          <div style={{marginBottom:8}}>
            <label htmlFor="checkout-notes" style={{display:'block',fontSize:'0.875rem',marginBottom:4}}>Notes</label>
            <textarea id="checkout-notes" name="notes" value={form.notes} onChange={handleChange} className="form-input" style={{minHeight:80}} />
          </div>
        </section>

        <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
          <button className="button" onClick={() => { navigate('/delivery'); }}>Back</button>
          <button className="button primary" onClick={finalizeOrder}>Place Order</button>
        </div>
      </div>
    </div>
  )
}
