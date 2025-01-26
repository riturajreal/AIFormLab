import React from "react";

const AnalyticsPage = () => {
    return (
        <main className="flex-1 ml-64 w-[calc(100%-16rem)] p-20">
          <div className="w-full">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Welcome back!</h1>
              <p className="text-zinc-400">Here's an overview of your forms</p>
            </div>
  
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Total Forms', value: '12' },
                { label: 'Total Responses', value: '1,234' },
                { label: 'Active Forms', value: '8' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
                >
                  <p className="text-zinc-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
  
            {/* Recent Forms Section */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Forms</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((form) => (
                  <div 
                    key={form}
                    className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    <div>
                      <h3 className="text-white font-medium">Customer Feedback Form</h3>
                      <p className="text-zinc-400 text-sm">Created 2 days ago</p>
                    </div>
                    <div className="text-zinc-400 text-sm">23 responses</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
    );
}

export default AnalyticsPage