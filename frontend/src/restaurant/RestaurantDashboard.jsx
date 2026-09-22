import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, CheckCircle2, Clock3, Package, Sparkles, Utensils, XCircle } from "lucide-react";
import { apiFetch, getOrderItemPrice } from "../utils/api";

const statusLabels = { pending: "New", confirmed: "Confirmed", preparing: "Preparing", pickup: "Ready", on_the_way: "On the way", delivered: "Delivered", cancelled: "Cancelled" };

const RestaurantDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      const [orderData, insightData] = await Promise.all([apiFetch("/orders"), apiFetch("/platform/analytics/restaurant")]);
      setOrders(Array.isArray(orderData) ? orderData : []);
      setInsights(insightData);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await apiFetch(`/orders/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) });
      setOrders(current => current.map(order => order._id === id ? { ...order, status } : order));
    } catch (error) { setMessage(error.message); }
  };

  const cards = [
    { label: "Revenue", value: `₹${Number(insights?.totals?.revenue || 0).toLocaleString("en-IN")}`, icon: <BarChart3 /> },
    { label: "Active orders", value: insights?.totals?.pending ?? orders.filter(order => !["delivered", "cancelled"].includes(order.status)).length, icon: <Clock3 /> },
    { label: "Menu items", value: insights?.totals?.menuItems ?? 0, icon: <Utensils /> },
    { label: "Top dish", value: insights?.topFood?.name || "No data yet", icon: <Sparkles /> },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8f4] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="overflow-hidden rounded-[2rem] bg-[#143733] p-7 text-white shadow-xl sm:p-10">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><p className="text-xs font-black uppercase tracking-[.22em] text-lime-300">Restaurant workspace</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Run the kitchen with clarity.</h1><p className="mt-4 max-w-2xl leading-7 text-white/65">Keep orders moving, see what customers want next, and make better menu decisions from one calm dashboard.</p></div><Link to="/admin/manage-food" className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#e7f55f] px-5 py-3 text-sm font-black text-[#143733] transition hover:bg-white"><Package size={17} /> Manage menu</Link></div>
        </header>

        {message && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{message}</div>}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(card => <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{card.label}</p><p className="mt-3 max-w-[190px] truncate text-2xl font-black text-slate-900">{card.value}</p></div><div className="rounded-xl bg-orange-50 p-3 text-orange-600">{card.icon}</div></div></div>)}</div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-orange-600">Live queue</p><h2 className="mt-1 text-2xl font-black">Orders to prepare</h2></div><span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{orders.length} total</span></div>{loading ? <div className="h-48 animate-pulse rounded-2xl bg-slate-100" /> : orders.length === 0 ? <div className="py-14 text-center text-sm text-slate-500">No orders have arrived yet.</div> : <div className="space-y-3">{orders.slice(0, 12).map(order => <article key={order._id} className="flex flex-col gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-orange-200 hover:bg-orange-50/30 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><span className="text-sm font-black text-slate-900">#{order._id?.slice(-6)}</span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold capitalize text-slate-600">{statusLabels[order.status] || order.status}</span></div><p className="mt-2 text-sm text-slate-500">{order.items?.map(item => `${item.name} x${item.quantity}`).join(" · ")}</p><p className="mt-1 text-xs font-bold text-slate-900">₹{Number(order.total || 0).toFixed(2)}</p></div><div className="flex items-center gap-2">{order.status === "pending" && <button onClick={() => updateStatus(order._id, "confirmed")} className="rounded-xl bg-[#143733] px-3 py-2 text-xs font-bold text-white">Accept</button>}{order.status === "confirmed" && <button onClick={() => updateStatus(order._id, "preparing")} className="rounded-xl bg-orange-500 px-3 py-2 text-xs font-bold text-white">Start cooking</button>}{order.status === "preparing" && <button onClick={() => updateStatus(order._id, "pickup")} className="rounded-xl bg-cyan-600 px-3 py-2 text-xs font-bold text-white">Ready</button>}{["delivered", "cancelled"].includes(order.status) && <span className="flex items-center gap-1 text-xs font-bold text-slate-400"><CheckCircle2 size={15} /> Closed</span>}</div></article>)}</div>}</section>
          <aside className="space-y-5"><div className="rounded-3xl bg-[#143733] p-6 text-white shadow-sm"><div className="flex items-start justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-lime-300">AI demand forecast</p><h2 className="mt-2 text-2xl font-black">Next service window</h2></div><Sparkles className="text-lime-300" size={21} /></div><div className="mt-6 space-y-3">{(insights?.forecast || ["Demand will rise around dinner", "Keep popular items stocked", "Try a weekday value offer"]).map(signal => <p key={signal} className="flex gap-2 text-sm leading-6 text-white/70"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-300" />{signal}</p>)}</div></div><div className="rounded-3xl border border-orange-100 bg-orange-50 p-6"><p className="text-xs font-black uppercase tracking-[.18em] text-orange-600">Peak ordering window</p><p className="mt-3 text-3xl font-black text-slate-900">{insights?.peakHour || "Awaiting data"}</p><p className="mt-2 text-sm text-slate-600">Use this window for prep planning and targeted offers.</p></div></aside>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
