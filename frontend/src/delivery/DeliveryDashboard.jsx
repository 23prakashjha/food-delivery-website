import React, { useEffect, useState } from "react";
import { CheckCircle2, LocateFixed, MapPin, Package, Power, Truck, UserRound } from "lucide-react";
import { apiFetch, getOrderItemPrice } from "../utils/api";

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [available, setAvailable] = useState(true);
  const [location, setLocation] = useState({ lat: "", lng: "", etaMinutes: 15 });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadOrders = async () => {
    try {
      const data = await apiFetch("/orders");
      setOrders(Array.isArray(data) ? data.filter(order => ["pickup", "on_the_way"].includes(order.status)) : []);
    } catch (error) { setMessage(error.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadOrders(); const timer = setInterval(loadOrders, 15000); return () => clearInterval(timer); }, []);

  const register = async () => {
    try {
      await apiFetch("/platform/delivery/register", { method: "POST", body: JSON.stringify({ isAvailable: available }) });
      setMessage(available ? "You are now available for deliveries." : "Availability paused.");
    } catch (error) { setMessage(error.message); }
  };

  const updateLocation = async (orderId) => {
    try {
      await apiFetch(`/platform/orders/${orderId}/location`, { method: "PUT", body: JSON.stringify({ lat: Number(location.lat), lng: Number(location.lng), etaMinutes: Number(location.etaMinutes) }) });
      setMessage("Order location and ETA updated.");
      loadOrders();
    } catch (error) { setMessage(error.message); }
  };

  return (
    <div className="min-h-screen bg-[#f5f8f6] px-4 py-8 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl space-y-8">
      <header className="rounded-[2rem] bg-[#143733] p-7 text-white shadow-xl sm:p-10"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[.22em] text-lime-300">Delivery partner hub</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Move good food forward.</h1><p className="mt-4 max-w-xl leading-7 text-white/65">Control your availability, keep ETAs accurate, and give customers confidence while their order is on the road.</p></div><button onClick={() => { setAvailable(value => !value); setTimeout(register, 0); }} className={`inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-black transition ${available ? "bg-[#e7f55f] text-[#143733]" : "bg-white/10 text-white"}`}><Power size={17} /> {available ? "Available" : "Paused"}</button></div></header>
      {message && <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">{message}</div>}
      <div className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-5"><Truck className="text-orange-600" size={21} /><p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">Active assignments</p><p className="mt-2 text-3xl font-black">{orders.length}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><CheckCircle2 className="text-emerald-600" size={21} /><p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">Partner status</p><p className="mt-2 text-xl font-black">{available ? "Ready for work" : "Taking a break"}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><LocateFixed className="text-sky-600" size={21} /><p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">Updates</p><p className="mt-2 text-xl font-black">Every 15 seconds</p></div></div>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-6 flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-orange-600">Your route</p><h2 className="mt-1 text-2xl font-black">Assigned orders</h2></div><Package className="text-slate-300" /></div>{loading ? <div className="h-40 animate-pulse rounded-2xl bg-slate-100" /> : orders.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-sm text-slate-500">No pickup or active delivery assignments right now.</div> : <div className="space-y-4">{orders.map(order => <article key={order._id} className="rounded-2xl border border-slate-100 p-5"><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center"><div><div className="flex flex-wrap items-center gap-2"><span className="font-black">Order #{order._id?.slice(-6)}</span><span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold capitalize text-orange-700">{order.status.replaceAll("_", " ")}</span></div><p className="mt-2 text-sm text-slate-500">{order.items?.map(item => `${item.name} x${item.quantity}`).join(" · ")}</p><p className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-500"><MapPin size={14} /> Update the customer-facing ETA below</p></div><div className="grid grid-cols-3 gap-2"><input value={location.lat} onChange={event => setLocation({ ...location, lat: event.target.value })} placeholder="Lat" className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs outline-none focus:border-emerald-600" /><input value={location.lng} onChange={event => setLocation({ ...location, lng: event.target.value })} placeholder="Lng" className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs outline-none focus:border-emerald-600" /><input value={location.etaMinutes} onChange={event => setLocation({ ...location, etaMinutes: event.target.value })} placeholder="ETA" className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs outline-none focus:border-emerald-600" /></div><button onClick={() => updateLocation(order._id)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#143733] px-4 py-2.5 text-xs font-bold text-white"><LocateFixed size={15} /> Send update</button></div></article>)}</div>}</section>
      <div className="flex items-center gap-3 rounded-2xl bg-orange-50 p-5 text-sm text-orange-900"><UserRound size={19} /><span>Keep location permissions and phone access enabled while delivering so customers receive accurate updates.</span></div>
    </div></div>
  );
};

export default DeliveryDashboard;
