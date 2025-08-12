"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, MessageSquare, CreditCard, Upload } from "lucide-react";

export default function Home() {
  const [ready, setReady] = useState(false);
  const [log, setLog] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/dev/migrate", { method: "POST" });
        const txt = await res.text();
        setLog(txt);
        setReady(true);
      } catch (error) {
        setLog("Migration failed: " + error);
        setReady(true);
      }
    })();
  }, []);

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Building2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">OverseeNOI</h1>
        </div>
        <p className="text-gray-600 text-lg">Slack-style task management for real estate asset management</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Link 
          className="group p-6 rounded-lg bg-white border hover:border-blue-300 hover:shadow-md transition-all" 
          href="/auth"
        >
          <MessageSquare className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold mb-2">Login / Sign up</h3>
          <p className="text-sm text-gray-600">Access your workspace with magic link authentication</p>
        </Link>
        
        <Link 
          className="group p-6 rounded-lg bg-white border hover:border-blue-300 hover:shadow-md transition-all" 
          href="/app"
        >
          <Building2 className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold mb-2">Open App</h3>
          <p className="text-sm text-gray-600">Access the main task management interface</p>
        </Link>
        
        <Link 
          className="group p-6 rounded-lg bg-white border hover:border-blue-300 hover:shadow-md transition-all" 
          href="/billing"
        >
          <CreditCard className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold mb-2">Billing</h3>
          <p className="text-sm text-gray-600">Manage your subscription and billing</p>
        </Link>
        
        <Link 
          className="group p-6 rounded-lg bg-white border hover:border-blue-300 hover:shadow-md transition-all" 
          href="/uploads"
        >
          <Upload className="w-8 h-8 text-orange-600 mb-3" />
          <h3 className="font-semibold mb-2">Data Uploads</h3>
          <p className="text-sm text-gray-600">Upload rent rolls and competitor data</p>
        </Link>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold mb-3">System Status</h3>
        <div className="bg-gray-50 rounded p-4">
          <div className="font-mono text-xs whitespace-pre-wrap text-gray-700">{log}</div>
          <div className="mt-3 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${ready ? "bg-green-500" : "bg-yellow-500"}`}></div>
            <span className="text-sm">{ready ? "Database ready" : "Preparing database..."}</span>
          </div>
        </div>
      </div>
    </main>
  );
}