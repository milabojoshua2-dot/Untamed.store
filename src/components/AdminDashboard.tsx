import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Package, Clock, CheckCircle, Truck, 
  Trash2, ArrowLeft, RefreshCw, 
  Search, Filter, ExternalLink 
} from "lucide-react";

interface Order {
  id: string;
  timestamp: string;
  items: any[];
  customer: any;
  total: number;
  status: string;
}

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("untamed_orders") || "[]");
    setOrders(savedOrders);
  }, []);

  const updateStatus = (id: string, status: string) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    localStorage.setItem("untamed_orders", JSON.stringify(updated));
  };

  const deleteOrder = (id: string) => {
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    localStorage.setItem("untamed_orders", JSON.stringify(updated));
  };

  const filteredOrders = filter === "All" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="fixed inset-0 z-[4000] bg-brand-black overflow-hidden flex flex-col">
      <header className="p-6 border-b border-brand-white/10 flex justify-between items-center bg-brand-gray/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-brand-white/5 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-accent flex items-center justify-center">
              <Package size={16} className="text-brand-black" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tighter">Command Center</h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-brand-white/40 uppercase tracking-widest hidden sm:block">System Status: Optimal</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="container mx-auto">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Revenue", val: `$${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}`, color: "text-brand-accent" },
              { label: "New Signals", val: orders.filter(o => o.status === "New").length, color: "text-white" },
              { label: "Processing", val: orders.filter(o => o.status === "Processing").length, color: "text-white" },
              { label: "Finalized", val: orders.filter(o => o.status === "Completed").length, color: "text-brand-white/40" },
            ].map(stat => (
              <div key={stat.label} className="bg-brand-gray border border-brand-white/5 p-6 rounded-sm">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-white/40 mb-2">{stat.label}</p>
                <p className={`text-3xl font-black ${stat.color}`}>{stat.val}</p>
              </div>
            ))}
          </div>

          {/* Table Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
             <div className="flex gap-2 p-1 bg-brand-gray border border-brand-white/5 rounded-sm">
               {["All", "New", "Processing", "Shipped", "Completed"].map(f => (
                 <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 text-[10px] font-mono uppercase transition-all ${filter === f ? 'bg-brand-white text-brand-black' : 'text-brand-white/40 hover:text-white'}`}
                 >
                   {f}
                 </button>
               ))}
             </div>
             <div className="relative group w-full md:w-64">
               <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/30" />
               <input 
                 type="text" 
                 placeholder="SEARCH HASH..." 
                 className="w-full bg-brand-gray border border-brand-white/5 py-3 pl-12 pr-4 text-[10px] font-mono outline-none focus:border-brand-accent transition-colors"
                />
             </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
             {filteredOrders.length === 0 ? (
               <div className="py-32 text-center border-2 border-dashed border-brand-white/5 opacity-20">
                 <p className="text-sm font-mono uppercase tracking-widest">No Active Transmissions</p>
               </div>
             ) : (
               filteredOrders.map((order) => (
                 <motion.div 
                  layout
                  key={order.id}
                  className="bg-brand-gray border border-brand-white/5 p-6 rounded-sm group overflow-hidden"
                 >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                       <div className="flex gap-6 items-start">
                          <div className={`p-4 rounded-sm ${
                            order.status === 'New' ? 'bg-brand-accent/20 text-brand-accent' : 
                            order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' : 'bg-brand-white/5 text-brand-white/20'
                          }`}>
                            <Package size={24} />
                          </div>
                          <div className="space-y-1">
                             <div className="flex items-center gap-3">
                               <p className="text-xl font-black tracking-tighter uppercase">{order.id}</p>
                               <span className={`text-[8px] font-mono px-2 py-0.5 uppercase tracking-widest border ${
                                 order.status === 'New' ? 'border-brand-accent text-brand-accent' : 'border-brand-white/20'
                               }`}>{order.status}</span>
                             </div>
                             <p className="text-xs font-mono text-brand-white/40 uppercase">
                               {new Date(order.timestamp).toLocaleString()} // {order.customer.email}
                             </p>
                          </div>
                       </div>
                       
                       <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                          <div className="flex-1 lg:flex-none text-right lg:text-left pr-8 lg:pr-12 border-r border-brand-white/5">
                             <p className="text-[10px] font-mono text-brand-white/40 uppercase">Value</p>
                             <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex gap-2">
                             <select 
                              value={order.status}
                              onChange={(e) => updateStatus(order.id, e.target.value)}
                              className="bg-brand-black border border-brand-white/10 text-[10px] font-mono px-3 py-2 outline-none focus:border-brand-accent"
                             >
                               <option value="New">MARK: NEW</option>
                               <option value="Processing">MARK: PROCESSING</option>
                               <option value="Shipped">MARK: SHIPPED</option>
                               <option value="Completed">MARK: COMPLETED</option>
                             </select>
                             <button 
                              onClick={() => deleteOrder(order.id)}
                              className="p-2 border border-brand-white/10 hover:bg-red-500/20 hover:text-red-500 transition-all rounded-sm"
                             >
                                <Trash2 size={16} />
                             </button>
                          </div>
                       </div>
                    </div>

                    {/* Details Expansion (Simple) */}
                    <div className="mt-6 pt-6 border-t border-brand-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 opacity-60">
                       <div>
                          <p className="text-[10px] font-mono uppercase text-brand-accent mb-4 tracking-widest">Cargo Manifest</p>
                          <div className="space-y-4">
                             {order.items.map((item: any) => (
                               <div key={item.id} className="flex justify-between items-center text-xs">
                                  <span className="font-bold">{item.quantity}× {item.name} ({item.size})</span>
                                  <span className="font-mono text-[10px]">${(item.price * item.quantity).toFixed(2)}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                       <div>
                          <p className="text-[10px] font-mono uppercase text-brand-accent mb-4 tracking-widest">Routing Data</p>
                          <p className="text-xs font-bold">{order.customer.firstName} {order.customer.lastName}</p>
                          <p className="text-xs opacity-60">{order.customer.address}, {order.customer.city} {order.customer.zip}</p>
                          <p className="text-xs italic mt-2 opacity-40">Notes: {order.customer.notes || "None"}</p>
                       </div>
                    </div>
                 </motion.div>
               ))
             )}
          </div>
        </div>
      </main>

      <footer className="p-4 border-t border-brand-white/5 text-center text-[8px] font-mono text-brand-white/20 uppercase tracking-[0.3em]">
        Untamed Core Operations // Authorized Personnel Only
      </footer>
    </div>
  );
}
