"use client";
import { useEffect, useState } from "react";
import { CreditCard, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Billing() {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/billing/portal", { method: "POST" });
        const data = await res.json();
        setUrl(data.url || "");
      } catch (error) {
        console.error("Failed to load billing portal:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/app" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to app
        </Link>
        
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-semibold">Billing & Subscription</h1>
                <p className="text-gray-600">Manage your OverseeNOI subscription</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Current Plan</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Standard Plan</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-gray-600">Full access to all features</p>
                  <p className="text-lg font-semibold mt-2">$99/month</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Manage Subscription</h3>
                <div className="space-y-3">
                  <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={!url || loading}
                    onClick={() => { 
                      if (url) window.open(url, '_blank'); 
                    }}
                  >
                    {loading ? (
                      "Loading..."
                    ) : url ? (
                      <>
                        <ExternalLink className="w-4 h-4" />
                        Open Customer Portal
                      </>
                    ) : (
                      "Portal Unavailable"
                    )}
                  </button>
                  
                  {!url && !loading && (
                    <p className="text-sm text-gray-500 text-center">
                      Stripe not configured; portal disabled in preview mode.
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">Billing Information</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Next billing date</div>
                  <div className="font-medium">January 15, 2025</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Payment method</div>
                  <div className="font-medium">•••• 4242</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Billing email</div>
                  <div className="font-medium">billing@company.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}