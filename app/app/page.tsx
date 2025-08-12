"use client";
import { useEffect, useMemo, useState } from "react";
import { MessageSquare, Calendar, Users, Plus, Settings, Upload, Home } from "lucide-react";
import Link from "next/link";

type Channel = { id: string; name: string; key: string; };
type Property = { id: string; name: string; address: string; channels: Channel[]; };
type Task = {
  id: string; 
  title: string; 
  description?: string; 
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "OPEN" | "IN_PROGRESS" | "SCHEDULED" | "COMPLETED" | "CANCELLED";
  assignee?: { displayName: string } | null; 
  dueAt?: string | null;
};

export default function AppPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProp, setSelectedProp] = useState<Property | undefined>();
  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [thread, setThread] = useState<any[]>([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/bootstrap");
        const data = await res.json();
        setProperties(data.properties);
        if (data.properties.length > 0) {
          setSelectedProp(data.properties[0]);
          setSelectedChannel(data.properties[0]?.channels[0]);
        }
      } catch (error) {
        console.error("Bootstrap failed:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!selectedChannel) return;
    (async () => {
      try {
        const res = await fetch(`/api/tasks?channelId=${selectedChannel.id}`);
        const tasksData = await res.json();
        setTasks(tasksData);
        setSelectedTask(undefined);
        setThread([]);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    })();
  }, [selectedChannel?.id]);

  useEffect(() => {
    if (!selectedTask) return;
    (async () => {
      try {
        const res = await fetch(`/api/messages?taskId=${selectedTask.id}`);
        const threadData = await res.json();
        setThread(threadData);
      } catch (error) {
        console.error("Failed to load thread:", error);
      }
    })();
  }, [selectedTask?.id]);

  const priorities = useMemo(() => ({
    LOW: "text-green-700 bg-green-50 border-green-200",
    MEDIUM: "text-yellow-700 bg-yellow-50 border-yellow-200",
    HIGH: "text-red-700 bg-red-50 border-red-200",
    CRITICAL: "text-red-900 bg-red-100 border-red-300"
  }), []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">OverseeNOI</h2>
            <div className="flex gap-2">
              <Link href="/uploads" className="p-2 rounded hover:bg-gray-100">
                <Upload className="w-4 h-4" />
              </Link>
              <Link href="/billing" className="p-2 rounded hover:bg-gray-100">
                <Settings className="w-4 h-4" />
              </Link>
              <Link href="/" className="p-2 rounded hover:bg-gray-100">
                <Home className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {properties.map(p => (
              <div key={p.id}>
                <div 
                  className={`p-3 rounded cursor-pointer transition-colors ${
                    selectedProp?.id === p.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => { 
                    setSelectedProp(p); 
                    setSelectedChannel(p.channels[0]); 
                  }}
                >
                  <div className="font-medium text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.address}</div>
                  <div className="text-xs text-gray-400 mt-1">{p.unitCount} units</div>
                </div>
                
                {selectedProp?.id === p.id && (
                  <div className="mt-2 ml-4 space-y-1">
                    {p.channels.map(c => (
                      <div
                        key={c.id}
                        className={`text-sm flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                          selectedChannel?.id === c.id 
                            ? "bg-blue-100 text-blue-900 border border-blue-200" 
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                        onClick={() => setSelectedChannel(c)}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task list */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">
                {selectedProp?.name} • {selectedChannel?.name}
              </h3>
              <p className="text-sm text-gray-500">{tasks.length} tasks</p>
            </div>
            <button 
              className="flex items-center gap-2 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              onClick={async () => {
                if (!selectedChannel) return;
                try {
                  const res = await fetch("/api/tasks", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      channelId: selectedChannel.id,
                      title: "New Task",
                      description: "Describe the work needed",
                      priority: "MEDIUM",
                      tags: []
                    })
                  });
                  const newTask = await res.json();
                  setTasks(prev => [newTask, ...prev]);
                } catch (error) {
                  console.error("Failed to create task:", error);
                }
              }}
            >
              <Plus className="w-4 h-4" />
              New Task
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {tasks.map(t => (
            <div 
              key={t.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedTask?.id === t.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
              }`}
              onClick={() => setSelectedTask(t)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 flex-1">{t.title}</h4>
                <span className={`text-xs px-2 py-1 border rounded-full ${priorities[t.priority]}`}>
                  {t.priority}
                </span>
              </div>
              
              {t.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{t.description}</p>
              )}
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3" />
                  <span>{t.assignee?.displayName ?? "Unassigned"}</span>
                </div>
                {t.dueAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(t.dueAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {tasks.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No tasks in this channel yet.</p>
              <p className="text-sm">Create your first task to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Thread */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">
                {selectedTask ? selectedTask.title : "Select a task"}
              </h3>
              {selectedTask && (
                <p className="text-sm text-gray-500">
                  {selectedTask.description || "No description"}
                </p>
              )}
            </div>
            {selectedTask && selectedTask.status !== "COMPLETED" && (
              <button 
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
                onClick={async () => {
                  try {
                    await fetch(`/api/tasks/${selectedTask.id}/complete`, { method: "POST" });
                    setTasks(prev => prev.map(tt => 
                      tt.id === selectedTask.id ? { ...tt, status: "COMPLETED" } : tt
                    ));
                  } catch (error) {
                    console.error("Failed to complete task:", error);
                  }
                }}
              >
                Complete Task
              </button>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {selectedTask ? (
            <div className="space-y-4">
              {thread.map(m => (
                <div 
                  key={m.id} 
                  className={`max-w-2xl ${
                    m.isSystem 
                      ? "mx-auto text-center text-blue-700 bg-blue-50 border border-blue-200" 
                      : "bg-gray-50 border border-gray-200"
                  } p-4 rounded-lg`}
                >
                  {!m.isSystem && (
                    <div className="text-xs text-gray-600 mb-2 font-medium">
                      {m.author?.displayName ?? "User"}
                    </div>
                  )}
                  <div className="text-sm">{m.content}</div>
                  <div className="text-xs text-gray-400 mt-2">
                    {new Date(m.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
              
              {thread.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No messages yet.</p>
                  <p className="text-sm">Start the conversation below.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Select a task</h3>
                <p className="text-gray-400">Choose a task from the list to view its thread and collaborate</p>
              </div>
            </div>
          )}
        </div>
        
        {selectedTask && (
          <div className="p-4 border-t border-gray-200">
            <form 
              className="flex gap-3" 
              onSubmit={async (e) => {
                e.preventDefault();
                if (!selectedTask || !msg.trim()) return;
                
                try {
                  const res = await fetch("/api/messages", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ taskId: selectedTask.id, content: msg })
                  });
                  const newMessage = await res.json();
                  setThread(prev => [...prev, newMessage]);
                  setMsg("");
                } catch (error) {
                  console.error("Failed to send message:", error);
                }
              }}
            >
              <input 
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Type a message…" 
                value={msg} 
                onChange={(e) => setMsg(e.target.value)} 
              />
              <button 
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                disabled={!msg.trim()}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}