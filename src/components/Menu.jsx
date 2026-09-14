import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { categories, products } from '../data/products';
import ProductCard from './ProductCard';
export default function Menu({ onAdd }) { const [category,setCategory]=useState('All'); const [search,setSearch]=useState(''); const filtered=useMemo(()=>products.filter(p=>(category==='All'||p.category===category)&&p.name.toLowerCase().includes(search.toLowerCase())),[category,search]); return <section id="menu" className="section menu"><div className="container"><div className="section-head"><div><p className="eyebrow">OUR BAKED FAVOURITES</p><h2>OUR <em>MENU.</em></h2></div>
</div>
<div className="menu-tools"><div className="category-filter">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div><label className="search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search the menu..." aria-label="Search menu"/></label></div><AnimatePresence mode="popLayout"><motion.div className="product-grid" layout>{filtered.map(p=><ProductCard key={p.id} product={p} onAdd={onAdd}/>)}</motion.div></AnimatePresence>{!filtered.length&&<div className="empty-state">No baked favourite found. Try another search.</div>}</div></section> }
