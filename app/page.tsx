'use client';

import { useState, useEffect } from 'react';
import { MapPin, Clock, CheckCircle2, AlertTriangle, Camera, Home, ClipboardList, Map as MapIcon, FileText, User } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';

interface Checkpoint {
  id: string;
  name: string;
  status: 'pending' | 'completed' | 'missed' | 'inProgress';
  timestamp?: string;
  sequenceOrder: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'tasks' | 'map' | 'reports' | 'profile'>('home');
  const [currentRoute, setCurrentRoute] = useState({
    name: 'Henryk Dun Gościnny Wawelski',
    progress: 52.95,
    checkpoints: [
      { id: '1', name: 'Inspect gate 1', status: 'completed' as const, timestamp: '14:32', sequenceOrder: 1 },
      { id: '2', name: 'Check perimeter fence', status: 'completed' as const, timestamp: '14:45', sequenceOrder: 2 },
      { id: '3', name: 'Check mailman', status: 'completed' as const, timestamp: '14:58', sequenceOrder: 3 },
      { id: '4', name: 'Inspect gate 1', status: 'inProgress' as const, sequenceOrder: 4 },
      { id: '5', name: 'Foxfire', status: 'pending' as const, sequenceOrder: 5 },
      { id: '6', name: 'North entrance', status: 'pending' as const, sequenceOrder: 6 },
      { id: '7', name: 'Loading dock', status: 'pending' as const, sequenceOrder: 7 },
      { id: '8', name: 'Parking lot', status: 'pending' as const, sequenceOrder: 8 },
    ]
  });

  const [showScanModal, setShowScanModal] = useState(false);

  const getStatusIcon = (status: Checkpoint['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'inProgress':
        return <Clock className="w-5 h-5 text-warning animate-pulse" />;
      case 'missed':
        return <AlertTriangle className="w-5 h-5 text-danger" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-text-muted" />;
    }
  };

  const getStatusColor = (status: Checkpoint['status']) => {
    switch (status) {
      case 'completed':
        return 'border-success';
      case 'inProgress':
        return 'border-warning';
      case 'missed':
        return 'border-danger';
      default:
        return 'border-text-muted';
    }
  };

  return (
    <div className="min-h-screen bg-bg relative">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-accent">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button className="p-2 hover:bg-surface-hover rounded-md transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-heading uppercase tracking-wider neon-text">Guard Tour</h1>
          <Wallet>
            <ConnectWallet>
              <Avatar className="w-8 h-8" />
            </ConnectWallet>
          </Wallet>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {activeTab === 'home' && (
          <>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${currentRoute.progress}%` }}
                />
              </div>
            </div>

            {/* Map View */}
            <div className="checkpoint-card mb-6 h-64 relative overflow-hidden">
              <div className="absolute inset-0 bg-surface">
                {/* Simulated map with checkpoint markers */}
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,255,65,0.1)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="300" fill="url(#grid)" />
                  
                  {/* Street lines */}
                  <path d="M 50 50 L 350 50 L 350 250 L 50 250 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                  <path d="M 200 50 L 200 250" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                  <path d="M 50 150 L 350 150" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                  
                  {/* Checkpoint markers */}
                  {currentRoute.checkpoints.map((cp, idx) => {
                    const positions = [
                      { x: 80, y: 80 },
                      { x: 150, y: 100 },
                      { x: 220, y: 120 },
                      { x: 280, y: 100 },
                      { x: 320, y: 140 },
                      { x: 300, y: 200 },
                      { x: 200, y: 220 },
                      { x: 100, y: 200 },
                    ];
                    const pos = positions[idx] || { x: 200, y: 150 };
                    const color = cp.status === 'completed' ? '#00ff41' : 
                                 cp.status === 'inProgress' ? '#ffaa00' : '#ff0040';
                    
                    return (
                      <g key={cp.id}>
                        <circle 
                          cx={pos.x} 
                          cy={pos.y} 
                          r="12" 
                          fill={color}
                          opacity="0.9"
                        />
                        <text 
                          x={pos.x} 
                          y={pos.y + 5} 
                          textAnchor="middle" 
                          fill="#000" 
                          fontSize="14" 
                          fontWeight="bold"
                        >
                          {cp.sequenceOrder}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Route Progress Card */}
            <div className="checkpoint-card mb-6 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-display neon-text">{currentRoute.progress}%</div>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-caption">{currentRoute.name}</p>
            </div>

            {/* Current Task */}
            <div className="mb-4">
              <h2 className="text-micro text-accent mb-3">This Inspect gate 1</h2>
            </div>

            {/* Checkpoint List */}
            <div className="space-y-3">
              {currentRoute.checkpoints.map((checkpoint) => (
                <div 
                  key={checkpoint.id}
                  className={`checkpoint-card p-4 flex items-center justify-between border-l-4 ${getStatusColor(checkpoint.status)}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-danger flex items-center justify-center text-white font-bold">
                      {checkpoint.sequenceOrder}
                    </div>
                    <div>
                      <p className="font-medium">{checkpoint.name}</p>
                      {checkpoint.timestamp && (
                        <p className="text-caption flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {checkpoint.timestamp}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(checkpoint.status)}
                    <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'tasks' && (
          <div className="text-center py-12">
            <ClipboardList className="w-16 h-16 mx-auto mb-4 text-accent" />
            <h2 className="text-title mb-2">Task Management</h2>
            <p className="text-caption">View and manage your assigned routes</p>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="text-center py-12">
            <MapIcon className="w-16 h-16 mx-auto mb-4 text-accent" />
            <h2 className="text-title mb-2">Full Map View</h2>
            <p className="text-caption">Interactive map of all checkpoints</p>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-accent" />
            <h2 className="text-title mb-2">Reports</h2>
            <p className="text-caption">View incident reports and route history</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="text-center py-12">
            <User className="w-16 h-16 mx-auto mb-4 text-accent" />
            <h2 className="text-title mb-2">Profile</h2>
            <Wallet>
              <ConnectWallet>
                <div className="flex flex-col items-center gap-4 mt-6">
                  <Avatar className="w-20 h-20" />
                  <Name className="text-heading" />
                </div>
              </ConnectWallet>
            </Wallet>
          </div>
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-4 flex flex-col gap-3 z-40">
        <button 
          onClick={() => setShowScanModal(true)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover shadow-glow flex items-center justify-center transition-all duration-200"
          aria-label="Scan checkpoint"
        >
          <MapPin className="w-6 h-6" />
        </button>
        <button 
          className="w-14 h-14 rounded-full bg-danger hover:opacity-90 shadow-elevated flex items-center justify-center transition-all duration-200"
          aria-label="Report incident"
        >
          <Camera className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-accent z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-around">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-accent' : 'text-text-muted'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'tasks' ? 'text-accent' : 'text-text-muted'}`}
          >
            <ClipboardList className="w-6 h-6" />
            <span className="text-xs">Tasks</span>
          </button>
          <button 
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'map' ? 'text-accent' : 'text-text-muted'}`}
          >
            <MapIcon className="w-6 h-6" />
            <span className="text-xs">Map</span>
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'reports' ? 'text-accent' : 'text-text-muted'}`}
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs">Reports</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-accent' : 'text-text-muted'}`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>

      {/* Scan Modal */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-md w-full cyber-border">
            <h3 className="text-title mb-4 neon-text">Scan Checkpoint</h3>
            <div className="aspect-square bg-surface rounded-lg mb-4 flex items-center justify-center">
              <div className="w-48 h-48 border-4 border-accent rounded-lg animate-pulse" />
            </div>
            <p className="text-caption text-center mb-6">Position QR code within frame</p>
            <button 
              onClick={() => setShowScanModal(false)}
              className="btn-primary w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
