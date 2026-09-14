import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar({ cartCount, onCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 30);
     window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll); }, []);
  const links = [['Home','home'],['About','about'],['Menu','menu'],['Gallery','gallery'],['Location','location'],['Contact','contact']];
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };
  return <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
    <div className="container nav-inner">
      <button className="brand" onClick={() => go('home')} aria-label="Go to homepage"><span className="brand-mark">GCB</span><span><strong>Golden</strong><small>Crumb Bakery</small></span></button>
      <nav className={`desktop-nav ${open ? 'mobile-open' : ''}`}>{links.map(([label,id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}<button className="nav-order" onClick={() => { go('menu'); onCart(); }}>Order Now</button></nav>
      <button className="cart-pill" onClick={onCart} aria-label={`Open cart with ${cartCount} items`}>🛒 <span>CART</span><b>{cartCount}</b></button>
      <button className={`hamburger ${open ? 'is-open' : ''}`} onClick={() => setOpen(v => !v)} aria-label="Toggle navigation"><i></i><i></i><i></i></button>
    </div>
    <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{opacity:0,height:0}}
     animate={{opacity:1,height:'auto'}} 
     exit={{opacity:0,height:0}}>{links.map(([label,id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}<button onClick={() => {go('menu'); onCart();}}>Order Now</button></motion.div>}</AnimatePresence>
  </header>;
}
