"use client";
import { useState } from "react";

export default function SpeechWritingPage() {
  const [occasion, setOccasion] = useState("Conference keynote");
  const [audience, setAudience] = useState("");
  const [keyMessage, setKeyMessage] = useState("");
  const [duration, setDuration] = useState("10 minutes");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyMessage.trim()) return;
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ occasion, audience, keyMessage, duration }),
    });
    const data = await res.json();
    setOutput(data.result || data.error);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-950 via-slate-950 to-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-300 mb-2">AI Speech Writing</h1>
        <p className="text-slate-400 mb-8">Craft compelling speeches for any occasion</p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Occasion</label>
              <select value={occasion} onChange={e => setOccasion(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500">
                {["Conference keynote","Wedding toast","TED-style talk","Team meeting","Award ceremony"," graduation","Political rally"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Audience</label>
              <input value={audience} onChange={e => setAudience(e.target.value)} placeholder="Who will be listening?"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Duration</label>
              <select value={duration} onChange={e => setDuration(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500">
                {["5 minutes","10 minutes","15 minutes","20 minutes","30 minutes","45 minutes"].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Key Message *</label>
              <textarea value={keyMessage} onChange={e => setKeyMessage(e.target.value)} rows={4}
                placeholder="What do you want the audience to take away?"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none" />
            </div>
            <button onClick={handleGenerate} disabled={loading}
              className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 text-white font-semibold py-3 rounded-xl transition-colors">
              {loading ? "Writing speech..." : "Write Speech"}
            </button>
          </div>
          <div className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-cyan-300 mb-4">Your Speech</h2>
            {output ? (
              <pre className="text-slate-200 text-sm whitespace-pre-wrap font-sans leading-relaxed max-h-[600px] overflow-y-auto">{output}</pre>
            ) : (
              <div className="text-slate-500 flex items-center justify-center h-64">Speech will appear here...</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
