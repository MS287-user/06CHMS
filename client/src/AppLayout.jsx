import React from 'react'
import { Outlet } from 'react-router-dom'
import SideNavbar from './components/SideNavbar'
import TopNavbar from './components/TopNavbar'

const AppLayout = ({logoutUser}) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideNavbar logoutUser={logoutUser} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Page Content */}
        <main className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
