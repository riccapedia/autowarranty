"use client";
import React, { useState } from "react";

type QuoteItem = {
  providerId: string;
  providerName: string;
  planName: string;
  termMonths: number;
  maxMileage: number;
  deductible: number;
  coverage: string;
  costToDealer: number;
  retailPrice: number;
  profit: number;
};

export default function HomePage() {
  const [year, setYear] = useState<number>(2018);
  const [make, setMake] = useState<string>("Toyota");
  const [model, setModel] = useState<string>("Corolla");
  const [mileage, setMileage] = useState<number>(90000);
  const [postal, setPostal] = useState<string>("M5V 2T6");
  const [providers, setProviders] = useState<string[]>(["obvi", "ensurall", "guardtree"]);
  const [markup, setMarkup] = useState<number>(800);
  const [quotes, setQuotes] = useState<QuoteItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleProvider = (id: string) => {
    setProviders(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setQuotes(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleYear: year, vehicleMake: make, vehicleModel: model, vehicleMileage: mileage, postal,
          providers, markup
        })
      });
      if (!res.ok) throw new Error("Failed to fetch quotes");
      const data = await res.json();
      setQuotes(data.quotes);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="card lg:col-span-1">
        <div className="card-header">Vehicle & Coverage</div>
        <div className="card-body">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label">Year</label>
              <input className="input" type="number" min={1998} max={2025} value={year} onChange={e=>setYear(parseInt(e.target.value||"0"))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Make</label>
                <input className="input" value={make} onChange={e=>setMake(e.target.value)} />
              </div>
              <div>
                <label className="label">Model</label>
                <input className="input" value={model} onChange={e=>setModel(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="label">Mileage (km)</label>
              <input className="input" type="number" value={mileage} onChange={e=>setMileage(parseInt(e.target.value||"0"))} />
            </div>
            <div>
              <label className="label">Postal Code</label>
              <input className="input" value={postal} onChange={e=>setPostal(e.target.value)} />
            </div>
            <div>
              <div className="label">Providers</div>
              <div className="flex gap-2 flex-wrap">
                {[
                  {id: "obvi", name: "Obvi (CA)"},
                  {id: "ensurall", name: "Ensūrall (CA)"},
                  {id: "guardtree", name: "GuardTree (ON)"},
                ].map(p => (
                  <button
                    type="button" key={p.id}
                    onClick={()=>toggleProvider(p.id)}
                    className={`badge ${providers.includes(p.id) ? 'bg-blue-100 text-blue-800' : ''}`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Dealer Markup ($)</label>
              <input type="range" min={0} max={2000} step={50} value={markup} onChange={e=>setMarkup(parseInt(e.target.value))} className="w-full"/>
              <div className="text-sm text-gray-600">Markup: <span className="font-semibold">${markup}</span></div>
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Quoting..." : "Get Quotes"}
            </button>
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </form>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="card">
          <div className="card-header">Results</div>
          <div className="card-body">
            {!quotes && !loading && <div className="text-gray-600">Fill the form and click <b>Get Quotes</b>.</div>}
            {quotes && (
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Provider</th>
                      <th>Plan</th>
                      <th>Term</th>
                      <th>Max Mileage</th>
                      <th>Deductible</th>
                      <th>Coverage</th>
                      <th>Cost to Dealer</th>
                      <th>Retail (with Markup)</th>
                      <th>Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((q, idx) => (
                      <tr key={idx}>
                        <td className="font-medium">{q.providerName}</td>
                        <td>{q.planName}</td>
                        <td>{q.termMonths} mo</td>
                        <td>{q.maxMileage.toLocaleString()} km</td>
                        <td>${q.deductible}</td>
                        <td className="small">{q.coverage}</td>
                        <td className="price">${q.costToDealer.toFixed(2)}</td>
                        <td className="price">${q.retailPrice.toFixed(2)}</td>
                        <td className="price text-green-700">${q.profit.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
