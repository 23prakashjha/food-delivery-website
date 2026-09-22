import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Check, ChefHat, Clock3, Leaf, Search, Sparkles, Star, Users, WandSparkles, Zap } from "lucide-react";
import axios from "axios";
import { API_BASE } from "../utils/api";
import { useCart } from "../context/CartContext";
import FoodCard from "../components/FoodCard";
import { useSearchParams } from "react-router-dom";

const starterQueries = [
  "Spicy chicken under ₹300",
  "Vegetarian food for 2 people under ₹500",
  "A comforting pizza night",
];

const intentLabels = [
  ["category", "Cuisine"],
  ["vegetarian", "Diet"],
  ["spicy", "Mood"],
  ["people", "Serves"],
  ["maxPrice", "Budget"],
];

const Discover = () => {
  const [query, setQuery] = useState("");
  const [intent, setIntent] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`${API_BASE}/ai/review-summary`)
      .then(({ data }) => setSummary(data))
      .catch(() => setSummary(null))
      .finally(() => setSummaryLoading(false));
  }, []);

  useEffect(() => {
    const initialQuery = searchParams.get("query");
    if (initialQuery && !query) discover(null, initialQuery);
  }, [searchParams]);

  const discover = async (event, value = query) => {
    event?.preventDefault();
    if (!value.trim()) return;
    setQuery(value);
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(`${API_BASE}/ai/discover`, { query: value });
      setIntent(data.intent);
      setRecommendations(data.recommendations || []);
    } catch {
      setError("FoodAI could not reach the kitchen right now. Try again in a moment.");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900">
      <section className="relative overflow-hidden bg-[#112d2b] text-white">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lime-300/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-200/20 bg-lime-100/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-lime-200">
              <Sparkles className="h-3.5 w-3.5" /> FoodAI discovery
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[.98] tracking-tight sm:text-6xl lg:text-7xl">Tell us what you&apos;re craving.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-50/70">Describe the meal in your own words. FoodAI understands taste, diet, budget, and who you&apos;re feeding.</p>
            <form onSubmit={discover} className="mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-white p-2 shadow-2xl sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search className="h-5 w-5 shrink-0 text-emerald-700" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. spicy chicken under ₹300" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400" />
              </div>
              <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e7f55f] px-6 py-3 font-bold text-[#173430] transition hover:bg-white disabled:cursor-wait disabled:opacity-60">
                {loading ? "Thinking..." : "Find my food"} <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {starterQueries.map((starter) => <button key={starter} onClick={() => discover(null, starter)} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition hover:border-lime-200/60 hover:text-lime-100">{starter}</button>)}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .15 }} className="relative mx-auto w-full max-w-md">
            <div className="rounded-[2rem] bg-[#e7f55f] p-5 text-[#173430] shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between border-b border-[#173430]/15 pb-4"><span className="flex items-center gap-2 text-sm font-black"><Bot className="h-5 w-5" /> FoodAI read</span><span className="rounded-full bg-[#173430] px-2 py-1 text-[10px] font-bold text-lime-100">LIVE</span></div>
              <div className="space-y-4 py-5">
                {[["Taste", "spicy + comforting", "bg-orange-500"], ["Diet", "vegetarian friendly", "bg-emerald-700"], ["Budget", "under ₹500", "bg-sky-600"]].map(([label, value, color]) => <div key={label} className="flex items-center gap-3"><span className={`h-2.5 w-2.5 rounded-full ${color}`} /><span className="w-16 text-xs font-bold uppercase tracking-wider opacity-60">{label}</span><span className="text-sm font-bold">{value}</span><Check className="ml-auto h-4 w-4" /></div>)}
              </div>
              <div className="rounded-xl bg-white/60 p-4 text-sm font-semibold">“I&apos;ve found a few warm, bold options that fit the table.”</div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl bg-white p-4 text-xs shadow-xl sm:flex"><div className="rounded-xl bg-orange-100 p-2 text-orange-600"><Zap className="h-4 w-4" /></div><span><b className="block text-slate-900">Explainable matches</b><span className="text-slate-500">Every pick has a reason</span></span></div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        {intent && <section className="mb-14"><div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[.2em] text-emerald-700">Your food brief</p><h2 className="mt-2 text-3xl font-black tracking-tight">Here&apos;s what FoodAI heard</h2></div><button onClick={() => { setIntent(null); setRecommendations([]); }} className="text-sm font-bold text-emerald-800 hover:underline">Start a new search</button></div><div className="flex flex-wrap gap-3">{intentLabels.filter(([key]) => intent[key] !== null && intent[key] !== false && intent[key] !== undefined).map(([key, label]) => <div key={key} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"><span className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</span><span className="text-sm font-bold text-slate-800">{key === "maxPrice" ? `₹${intent[key]}` : key === "vegetarian" ? "Vegetarian" : key === "spicy" ? "Spicy" : key === "people" ? `${intent[key]} people` : intent[key]}</span></div>)}</div></section>}

        <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div><div className="mb-6 flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[.2em] text-orange-600">Curated for you</p><h2 className="mt-2 text-3xl font-black tracking-tight">{intent ? "Your best matches" : "Popular right now"}</h2></div>{recommendations.length > 0 && <span className="text-sm text-slate-500">{recommendations.length} picks</span>}</div>{error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}{loading ? <div className="grid gap-6 sm:grid-cols-2"><div className="h-96 animate-pulse rounded-3xl bg-slate-200" /><div className="h-96 animate-pulse rounded-3xl bg-slate-200" /></div> : recommendations.length > 0 ? <div className="grid gap-6 sm:grid-cols-2">{recommendations.map((food) => <div key={food._id}><div className="mb-2 flex items-center gap-2 text-xs font-bold text-emerald-700"><WandSparkles className="h-3.5 w-3.5" /> {food.reason}</div><FoodCard food={food} onAdd={(item) => addToCart(item)} /></div>)}</div> : <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><ChefHat className="mx-auto h-10 w-10 text-slate-300" /><h3 className="mt-4 text-xl font-bold">Your next great meal starts with a sentence</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Try one of the prompts above and we&apos;ll translate it into food filters.</p></div>}</div>

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><div className="flex items-start justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-orange-600">Across the menu</p><h2 className="mt-2 text-2xl font-black">AI review pulse</h2></div><div className="rounded-xl bg-orange-100 p-2.5 text-orange-600"><Star className="h-5 w-5 fill-current" /></div></div>{summaryLoading ? <div className="mt-7 h-40 animate-pulse rounded-2xl bg-slate-100" /> : summary ? <><div className="mt-7 flex items-end gap-3"><span className="text-5xl font-black">{summary.rating || "—"}</span><span className="pb-1 text-sm text-slate-500">from {summary.reviewCount} signals</span></div><div className="mt-6 space-y-4">{summary.breakdown?.map((item) => <div key={item.label}><div className="mb-1.5 flex justify-between text-xs font-bold"><span>{item.label}</span><span>{item.value}%</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#e7a53b]" style={{ width: `${item.value}%` }} /></div></div>)}</div><div className="mt-7 border-t border-slate-100 pt-5"><p className="text-xs font-black uppercase tracking-wider text-slate-400">Customers love</p><div className="mt-3 flex flex-wrap gap-2">{summary.highlights?.map((item) => <span key={item} className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">{item}</span>)}</div></div></> : <p className="mt-6 text-sm leading-6 text-slate-500">Review intelligence will appear once menu ratings are available.</p>}</aside>
        </section>

        <section className="mt-20 grid gap-5 border-t border-slate-200 pt-10 sm:grid-cols-3"><div className="flex gap-3"><Leaf className="h-5 w-5 text-emerald-700" /><p className="text-sm leading-6"><b className="block">Diet-aware</b><span className="text-slate-500">Vegetarian and preference signals stay visible.</span></p></div><div className="flex gap-3"><Users className="h-5 w-5 text-emerald-700" /><p className="text-sm leading-6"><b className="block">Table-aware</b><span className="text-slate-500">Ask for one, two, or a whole hungry group.</span></p></div><div className="flex gap-3"><Clock3 className="h-5 w-5 text-emerald-700" /><p className="text-sm leading-6"><b className="block">Built for now</b><span className="text-slate-500">Fast answers when you need dinner, not menus.</span></p></div></section>
      </main>
    </div>
  );
};

export default Discover;