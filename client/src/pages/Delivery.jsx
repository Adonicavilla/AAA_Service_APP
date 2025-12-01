import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import { useNavigate, useLocation } from 'react-router-dom'
import { RESTAURANTS } from '../data/menus'

export default function Delivery(){
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()
  const [restaurant, setRestaurant] = useState(null)
  const [selectedItems, setSelectedItems] = useState({})

  function openModal(rest){
    setRestaurant(rest)
    // reset selected items when opening
    // reset selected items when opening
    setSelectedItems({})
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
        // prefill form from profile when opening via query
        const profile = JSON.parse(localStorage.getItem('userProfile') || 'null')
        setForm({
          name: profile?.name || '',
          phone: profile?.phone || '',
          address: profile?.address || '',
          notes: ''
        })
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



  function changeQty(itemId, delta){
    setSelectedItems(prev => {
      const qty = (prev[itemId] || 0) + delta
      const next = { ...prev }
      if(qty <= 0) delete next[itemId]
      else next[itemId] = qty
      return next
    })
  }

  function selectedList(){
    if(!restaurant?.menu) return []
    return restaurant.menu.filter(it => selectedItems[it.id]).map(it => ({ ...it, qty: selectedItems[it.id] }))
  }

  function confirmOrder(){
    const items = selectedList()
    if(items.length === 0){
      announce('Please select at least one item from the menu before proceeding to checkout.')
      return
    }

    const subtotal = Number(items.reduce((s, it) => s + (it.price * it.qty), 0).toFixed(2))

    // save a draft cart to localStorage and navigate to checkout
    const cartDraft = {
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      items: items,
      subtotal
    }
    localStorage.setItem('cartDraft', JSON.stringify(cartDraft))
    setModalOpen(false)
    announce('Proceeding to checkout. Fill delivery details to complete your order.')
    setTimeout(() => navigate('/checkout'), 300)
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
          {restaurant?.menu && (
            <div style={{marginBottom:12}}>
              <h4 style={{margin:0,marginBottom:8}}>Menu</h4>
              {restaurant.menu.map(it => (
                <div key={it.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'6px 0'}}>
                  <div>
                    <div style={{fontWeight:600}}>{it.name}</div>
                    <div style={{fontSize:'0.85rem',color:'#666'}}>${it.price.toFixed(2)}</div>
                  </div>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <button className="button" onClick={() => changeQty(it.id, -1)} aria-label={`Decrease ${it.name}`}>−</button>
                    <div style={{minWidth:24,textAlign:'center'}}>{selectedItems[it.id] || 0}</div>
                    <button className="button" onClick={() => changeQty(it.id, 1)} aria-label={`Increase ${it.name}`}>+</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected items preview and subtotal */}
          <div style={{marginBottom:12}}>
            <h4 style={{margin:0,marginBottom:8}}>Your Selection</h4>
            {selectedList().length > 0 ? (
              <div>
                {selectedList().map(it => (
                  <div key={it.id} style={{display:'flex',justifyContent:'space-between',padding:'4px 0'}}>
                    <div style={{color:'#222'}}>{it.name} × {it.qty}</div>
                    <div style={{color:'#222'}}>${(it.price * it.qty).toFixed(2)}</div>
                  </div>
                ))}
                <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #eee',paddingTop:8,marginTop:8,fontWeight:700}}>
                  <div>Subtotal</div>
                  <div>${selectedList().reduce((s, it) => s + (it.price * it.qty), 0).toFixed(2)}</div>
                </div>
              </div>
            ) : (
              <div style={{color:'#666'}}>No items selected yet. Use the menu above to add items.</div>
            )}
          </div>
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
