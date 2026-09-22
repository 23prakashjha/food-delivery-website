import React, { useEffect, useState } from "react";
import { Building2, MapPin, Plus, Trash2, Utensils } from "lucide-react";
import axios from "axios";
import { API_BASE, authHeaders } from "../utils/api";

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({ name: "", cuisine: "", address: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadRestaurants = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/platform/restaurants`);
      setRestaurants(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRestaurants(); }, []);

  const createRestaurant = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const { data } = await axios.post(`${API_BASE}/platform/restaurants`, {
        ...form,
        cuisine: form.cuisine.split(",").map(item => item.trim()).filter(Boolean),
      }, { headers: authHeaders() });
      setRestaurants(prev => [data, ...prev]);
      setForm({ name: "", cuisine: "", address: "", description: "" });
    } finally {
      setSaving(false);
    }
  };

  const removeRestaurant = async (id) => {
    await axios.delete(`${API_BASE}/platform/restaurants/${id}`, { headers: authHeaders() });
    setRestaurants(prev => prev.filter(restaurant => restaurant._id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-3xl bg-[#112d2b] p-8 text-white shadow-xl">
          <p className="text-xs font-black uppercase tracking-[.2em] text-lime-300">Restaurant operations</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Manage your restaurant network</h1>
          <p className="mt-3 max-w-2xl text-white/65">Create restaurant profiles, keep cuisines discoverable, and give customers a better route into the menu.</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <form onSubmit={createRestaurant} className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-5 flex items-center gap-3"><div className="rounded-xl bg-orange-100 p-2.5 text-orange-600"><Plus size={18} /></div><h2 className="text-xl font-black">Add restaurant</h2></div>
            <div className="space-y-4">
              {[['name', 'Restaurant name'], ['cuisine', 'Cuisines, comma separated'], ['address', 'Address']].map(([key, label]) => <input key={key} required={key === 'name'} value={form[key]} onChange={event => setForm({ ...form, [key]: event.target.value })} placeholder={label} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-600" />)}
              <textarea value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} placeholder="Short description" rows="4" className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-600" />
              <button disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"><Plus size={17} /> {saving ? "Adding..." : "Add restaurant"}</button>
            </div>
          </form>

          <section className="space-y-4">
            <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-emerald-700">Live directory</p><h2 className="mt-1 text-2xl font-black">{restaurants.length} restaurants</h2></div><Building2 className="text-slate-300" /></div>
            {loading ? <div className="h-40 animate-pulse rounded-3xl bg-slate-200" /> : restaurants.length === 0 ? <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">No restaurants yet. Add the first profile to start building your network.</div> : <div className="grid gap-4 sm:grid-cols-2">{restaurants.map(restaurant => <article key={restaurant._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div className="flex gap-3"><div className="rounded-xl bg-emerald-100 p-3 text-emerald-800"><Utensils size={19} /></div><div><h3 className="font-black">{restaurant.name}</h3><p className="mt-1 text-xs text-slate-500">{restaurant.cuisine?.join(" · ") || "Multi-cuisine"}</p></div></div><button onClick={() => removeRestaurant(restaurant._id)} title="Remove restaurant" className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button></div><p className="mt-4 text-sm leading-6 text-slate-500">{restaurant.description || "Ready to serve customers on FoodAI."}</p><p className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400"><MapPin size={14} /> {restaurant.address || "Address not added"}</p></article>)}</div>}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ManageRestaurants;
