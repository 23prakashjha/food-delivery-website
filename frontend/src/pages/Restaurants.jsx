import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Search, Star, Utensils } from "lucide-react";
import axios from "axios";
import { API_BASE } from "../utils/api";
import r1 from "../assets/restaurants/r1.jpeg";
import r2 from "../assets/restaurants/r2.jpeg";
import r3 from "../assets/restaurants/r3.jpeg";
import r4 from "../assets/restaurants/r4.jpeg";

const fallback = [
  { _id: "local-1", name: "Tandoori Nights", cuisine: ["North Indian", "Grill"], address: "Connaught Place", rating: 4.8, image: r1 },
  { _id: "local-2", name: "Sushi World", cuisine: ["Japanese", "Asian"], address: "Bandra West", rating: 4.7, image: r2 },
  { _id: "local-3", name: "Pizza Paradise", cuisine: ["Italian", "Pizza"], address: "MG Road", rating: 4.6, image: r3 },
  { _id: "local-4", name: "The Green Bowl", cuisine: ["Healthy", "Vegan"], address: "Koramangala", rating: 4.9, image: r4 },
];

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState(fallback);
  const [query, setQuery] = useState("");
  useEffect(() => { axios.get(`${API_BASE}/platform/restaurants`).then(({ data }) => { if (data?.length) setRestaurants(data); }).catch(() => {}); }, []);
  const filtered = restaurants.filter(item => `${item.name} ${item.cuisine?.join(" ")} ${item.address}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="min-h-screen bg-[#f7f8f4] px-4 py-10 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl space-y-10"><header className="relative overflow-hidden rounded-[2rem] bg-[#143733] px-6 py-12 text-white sm:px-10 sm:py-16"><div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-lime-300/15 blur-3xl" /><div className="relative max-w-2xl"><p className="text-xs font-black uppercase tracking-[.2em] text-lime-300">The FoodAI table</p><h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Meet your next favourite restaurant.</h1><p className="mt-5 text-lg leading-8 text-white/65">Explore trusted kitchens, local legends, and fresh places picked for curious appetites.</p></div></header><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-orange-600">Browse partners</p><h2 className="mt-2 text-3xl font-black">Restaurants near you</h2></div><div className="relative w-full sm:w-80"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search restaurants or cuisine" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-700" /></div></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((restaurant, index) => <motion.article key={restaurant._id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }} whileHover={{ y: -6 }} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="relative h-52 overflow-hidden bg-emerald-50"><img src={restaurant.image || fallback[index % fallback.length].image} alt={restaurant.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-black text-slate-800 shadow"><Star size={13} className="fill-orange-400 text-orange-400" /> {restaurant.rating || "4.6"}</div></div><div className="p-5"><h3 className="text-xl font-black text-slate-900">{restaurant.name}</h3><p className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-500"><MapPin size={14} /> {restaurant.address || "Delivering near you"}</p><p className="mt-3 text-sm text-slate-500">{restaurant.cuisine?.join(" · ") || "Multi-cuisine"}</p><Link to="/menu" state={{ restaurant }} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-800">View menu <ArrowRight size={15} /></Link></div></motion.article>)}</div>{filtered.length === 0 && <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center text-slate-500"><Utensils className="mx-auto mb-3 text-slate-300" />No restaurants match that search.</div>}</div></div>;
};
export default Restaurants;
