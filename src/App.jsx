import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Cart from './components/Cart';
import SpecialOffer from './components/SpecialOffer';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { products } from './data/products';

export default function App(){
 const [cartOpen,setCartOpen]=useState(false), [items,setItems]=useState([]), [checkout,setCheckout]=useState(false), [submitted,setSubmitted]=useState(false);
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem('ob-cart')||'[]'); if(Array.isArray(saved))setItems(saved)}catch{}},[]);
 useEffect(()=>localStorage.setItem('ob-cart',JSON.stringify(items)),[items]);
 const add=product=>setItems(old=>old.some(i=>i.id===product.id)?old.map(i=>i.id===product.id?{...i,qty:i.qty+1}:i):[...old,{...product,qty:1}]);
 const qty=(id,delta)=>setItems(old=>old.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+delta)}:i));
 const remove=id=>setItems(old=>old.filter(i=>i.id!==id));
 const startCheckout=()=>{if(items.length)setCheckout(true)};
 const submit=e=>{e.preventDefault();setSubmitted(true);setItems([])};
 const count=items.reduce((s,i)=>s+i.qty,0);
 return <><Navbar cartCount={count} onCart={()=>setCartOpen(true)}/><main><Hero/><About/><Menu onAdd={add}/><SpecialOffer/><WhyChooseUs/><Gallery/><Testimonials/><Location/><Contact/></main><Footer/><button className="floating-cart" onClick={()=>setCartOpen(true)}>🛒 <span>{count?`CART (${count})`:'CART'}</span></button><Cart open={cartOpen} onClose={()=>setCartOpen(false)} items={items} onQty={qty} onRemove={remove} onCheckout={()=>{setCartOpen(false);setCheckout(true)}}/><AnimatePresence>{checkout&&<motion.div className="modal-shell" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.div className="checkout-modal" initial={{y:25,scale:.98}} animate={{y:0,scale:1}}><button className="close-btn" onClick={()=>setCheckout(false)}>×</button>{submitted?<div className="confirmation"><div className="confirm-icon">✓</div><p className="eyebrow">THANK YOU</p><h2>ORDER <em>RECEIVED.</em></h2><p>Thank you for choosing Olorunsogo Bakery & Bites. This demo does not process real payments or create a real order.</p><button className="btn btn-primary" onClick={()=>{setCheckout(false);setSubmitted(false)}}>Back to Website</button></div>:<><p className="eyebrow">CHECKOUT</p><h2>Tell us where to <em>send the box.</em></h2><p className="checkout-note">Frontend-only demo. No payment is processed.</p><form onSubmit={submit} className="checkout-form"><label>Name<input required placeholder="Your full name"/></label><label>Phone Number<input required type="tel" placeholder="0800 000 0000"/></label><label>Delivery / Pickup<select defaultValue="Delivery"><option>Delivery</option><option>Pickup</option></select></label><label>Address<textarea required placeholder="Delivery address"></textarea></label><label>Additional Notes<textarea placeholder="Cake message, preferred time, special instructions..."></textarea></label><button className="btn btn-primary full" type="submit">Place Order <span>→</span></button></form></>}</motion.div></motion.div>}</AnimatePresence></>;
}
