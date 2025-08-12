"use client";
import React, { useState } from 'react';
import { Building2, MessageSquare, CheckCircle, Clock, AlertTriangle,
  Users, Settings, Plus, Search, Bell, Upload, Mic, Camera, Filter, MoreVertical, MapPin, Calendar } from 'lucide-react';
import { mockUser, mockProperties, mockTasks, mockNotifications } from "../lib/mock-data";
import { slackNotify } from "../lib/slack";
import { startSubscriptionCheckout } from "../lib/stripe";
import { sendWelcomeEmail, sendCancellationEmail } from "../lib/email";

const getPriorityColor = (priority:string) => {
  switch (priority) {
    case 'high': return 'text-red-600 bg-red-50 border-red-200';
    case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    default: return 'text-green-600 bg-green-50 border-green-200';
  }
};
const StatusIcon = ({status}:{status:string}) => status === 'completed'
 ? <CheckCircle className="w-4 h-4 text-green-600" />
 : status === 'in_progress'
 ? <Clock className="w-4 h-4 text-blue-600" />
 : <AlertTriangle className="w-4 h-4 text-gray-400" />;

export default function OverseeNOI(){
  const [selectedProperty, setSelectedProperty] = useState(mockProperties[0]);
  const [selectedChannel, setSelectedChannel] = useState(mockProperties[0].channels[0]);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const channelTasks = mockTasks.filter(
    t => t.channel === selectedChannel.key && t.property === selectedProperty.name
  );

  async function onSubscribe(){
    await sendWelcomeEmail("you@example.com", mockUser.name);
    await slackNotify(`User ${mockUser.name} started checkout (mock).`);
    const res = await startSubscriptionCheckout("pro");
    if (res?.url) window.location.href = res.url;
  }
  async function onCancel(){
    await sendCancellationEmail("you@example.com", mockUser.name);
    await slackNotify(`User ${mockUser.name} cancelled (mock).`);
    alert("Cancellation processed (mock).");
  }

  return (
  <div className="h-screen flex bg-gray-50">
    {/* Sidebar */}
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">OverseeNOI</h1>
              <p className="text-sm text-gray-500">{mockUser.company}</p>
            </div>
          </div>
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {mockNotifications.map(n => (
                    <div key={n.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm text-gray-900">{n.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text" placeholder="Search properties, tasks, or messages..."
            value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {mockProperties.map(p => (
          <div key={p.id}>
            <div
              className={`p-4 cursor-pointer border-b border-gray-100 ${selectedProperty.id===p.id?'bg-blue-50 border-l-4 border-l-blue-500':'hover:bg-gray-50'}`}
              onClick={()=>{ setSelectedProperty(p); setSelectedChannel(p.channels[0]); setSelectedTask(null); }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.unitCount} units</p>
                </div>
                <MapPin className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            {selectedProperty.id===p.id && (
              <div className="bg-gray-50">
                {p.channels.map(c => (
                  <div key={c.id}
                       className={`px-6 py-3 cursor-pointer border-b border-gray-100 ${selectedChannel.id===c.id?'bg-white border-l-4 border-l-blue-500':'hover:bg-white'}`}
                       onClick={()=>{ setSelectedChannel(c); setSelectedTask(null); }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">{c.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {c.unread>0 && <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">{c.unread}</span>}
                        <span className="text-xs text-gray-500">{c.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img src={mockUser.avatar} alt={mockUser.name} className="w-8 h-8 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{mockUser.name}</p>
            <p className="text-xs text-gray-500">asset manager</p>
          </div>
          <Settings className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>

    {/* Main */}
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedProperty.name} • {selectedChannel.name}
            </h2>
            <p className="text-sm text-gray-500">{selectedProperty.address}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              <Plus className="w-4 h-4" /><span>New Task</span>
            </button>
            <button onClick={onSubscribe} className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">Subscribe</button>
            <button onClick={onCancel} className="px-3 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300">Cancel</button>
            <button className="p-2 rounded-lg hover:bg-gray-100"><Upload className="w-4 h-4 text-gray-600" /></button>
            <button className="p-2 rounded-lg hover:bg-gray-100"><Filter className="w-4 h-4 text-gray-600" /></button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Tasks list */}
        <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">Tasks ({channelTasks.length})</h3>
          </div>
          <div className="space-y-1">
            {channelTasks.map(task => (
              <div key={task.id}
                   className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${selectedTask?.id===task.id?'bg-blue-50 border-l-4 border-l-blue-500':''}`}
                   onClick={()=>setSelectedTask(task)}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <StatusIcon status={task.status}/>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-2"><Users className="w-3 h-3" /><span>{task.assignee}</span></div>
                  <div className="flex items-center space-x-1"><Calendar className="w-3 h-3" /><span>{new Date(task.dueDate).toLocaleDateString()}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task detail */}
        <div className="flex-1 flex flex-col">
          {selectedTask ? (
            <>
              <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <StatusIcon status={selectedTask.status}/>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedTask.title}</h3>
                      <span className={`px-3 py-1 text-sm rounded-full border ${getPriorityColor(selectedTask.priority)}`}>
                        {selectedTask.priority} priority
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{selectedTask.description}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div><span className="text-gray-500">Assignee:</span><p className="font-medium text-gray-900">{selectedTask.assignee}</p></div>
                      <div><span className="text-gray-500">Due Date:</span><p className="font-medium text-gray-900">{new Date(selectedTask.dueDate).toLocaleDateString()}</p></div>
                      <div><span className="text-gray-500">Status:</span><p className="font-medium text-gray-900">{selectedTask.status.replace('_',' ')}</p></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">Complete Task</button>
                    <button className="p-2 rounded-lg hover:bg-gray-100"><MoreVertical className="w-4 h-4 text-gray-600" /></button>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {selectedTask.messages.map((m:any)=>(
                    <div key={m.id} className={`flex ${m.isSystem?'justify-center':'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${m.isSystem?'bg-blue-100 text-blue-800 text-sm':'bg-gray-100 text-gray-900'}`}>
                        {!m.isSystem && <p className="text-xs font-medium text-gray-600 mb-1">{m.author}</p>}
                        <p className="text-sm">{m.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{m.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <button className="p-2 rounded-lg hover:bg-gray-100"><Camera className="w-4 h-4 text-gray-600" /></button>
                  <button className="p-2 rounded-lg hover:bg-gray-100"><Mic className="w-4 h-4 text-gray-600" /></button>
                  <input
                    type="text" placeholder="Type a message..." value={newMessage}
                    onChange={(e)=>setNewMessage(e.target.value)}
                    onKeyDown={(e)=>{ if(e.key==='Enter' && newMessage.trim()){ setNewMessage(''); } }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button disabled={!newMessage.trim()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">Send</button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Select a task to view details</h3>
                <p className="text-gray-400">Choose a task from the list to see its thread and collaborate</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}