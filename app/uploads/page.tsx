"use client";
import { useState } from "react";
import { Upload, FileText, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Uploads() {
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);

  async function upload(path: string, file: File, type: string) {
    setUploading(type);
    setMsg("");
    
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch(path, { method: "POST", body });
      const result = await res.text();
      setMsg(result);
    } catch (error) {
      setMsg("Upload failed: " + error);
    } finally {
      setUploading(null);
    }
  }

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
              <Upload className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-semibold">Data Uploads</h1>
                <p className="text-gray-600">Upload CSV files for rent rolls and competitor analysis</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Rent Roll Upload */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-green-600" />
                <div>
                  <h2 className="text-lg font-medium">Rent Roll CSV</h2>
                  <p className="text-sm text-gray-600">
                    Upload your property's rent roll data for analysis and anomaly detection
                  </p>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <label className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700 font-medium">
                      Choose rent roll CSV file
                    </span>
                    <input 
                      type="file" 
                      accept=".csv" 
                      className="hidden"
                      disabled={uploading === "rentroll"}
                      onChange={e => {
                        const f = e.target.files?.[0]; 
                        if (f) upload("/api/upload/rentroll", f, "rentroll");
                      }} 
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    Expected columns: Unit, Tenant, Market Rent, Current Rent, Balance, Status
                  </p>
                  {uploading === "rentroll" && (
                    <div className="mt-3 text-blue-600">Uploading...</div>
                  )}
                </div>
              </div>
            </section>

            {/* Competitor Upload */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-purple-600" />
                <div>
                  <h2 className="text-lg font-medium">Competitor Data CSV</h2>
                  <p className="text-sm text-gray-600">
                    Upload competitor pricing data for market analysis and rent optimization
                  </p>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <label className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700 font-medium">
                      Choose competitor CSV file
                    </span>
                    <input 
                      type="file" 
                      accept=".csv" 
                      className="hidden"
                      disabled={uploading === "comps"}
                      onChange={e => {
                        const f = e.target.files?.[0]; 
                        if (f) upload("/api/upload/comps", f, "comps");
                      }} 
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    Expected columns: Property, Floorplan, Bedrooms, Rent, Specials
                  </p>
                  {uploading === "comps" && (
                    <div className="mt-3 text-blue-600">Uploading...</div>
                  )}
                </div>
              </div>
            </section>

            {/* Upload Result */}
            {msg && (
              <div className={`p-4 rounded-lg border ${
                msg.includes("error") || msg.includes("failed") 
                  ? "bg-red-50 border-red-200 text-red-800" 
                  : "bg-green-50 border-green-200 text-green-800"
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Upload Result</span>
                </div>
                <p className="mt-1">{msg}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}