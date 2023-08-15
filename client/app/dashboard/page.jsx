import React from 'react';
import SideMenu from '../components/dashboard-components/SideMenu';
import InfoCard from '../components/dashboard-components/InfoCard';
import EditCard from '../components/dashboard-components/EditCard';
import UserEditList from '../components/dashboard-components/UserEditList';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <div>
      <div className="md:hidden">
        <Navbar transparent />
      </div>
      <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4">
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
          <SideMenu />
          <div
            id="content"
            className="bg-white/10 max-md:col-span-12 col-span-9 rounded-lg p-6">
            <div id="24h">
              <h1 className="font-bold py-4 uppercase">Last 24h Statistics</h1>
              <div
                id="info-stats"
                className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
              </div>
            </div>
            <div id="last-incomes">
              <h1 className="font-bold py-4 uppercase">Last 24h incomes</h1>
              <div
                id="stats"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <EditCard />
                <EditCard />
                <EditCard />
                <EditCard />
                <EditCard />
                <EditCard />
              </div>
            </div>
            <div id="last-users">
              <h1 className="font-bold py-4 uppercase">Last 24h users</h1>
              <UserEditList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
