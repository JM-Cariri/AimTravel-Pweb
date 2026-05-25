import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import FeedPage from './pages/Feed'
import TripDetailPage from './pages/TripDetail'
import LoginPage from './pages/Auth/Login'
import RegisterPage from './pages/Auth/Register'
import VerifyEmailPage from './pages/Auth/VerifyEmail'
import NewTripPage from './pages/Trips/New'
import ExplorePage from './pages/Explore'
import WalletPage from './pages/Wallet'
import ProfilePage from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import BottomNavBar from './components/BottomNavBar'

export default function App() {
  const location = useLocation()
  const hideNav = ['/login', '/register', '/verify-email'].includes(location.pathname)

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/trips/:id" element={<TripDetailPage />} />
        <Route path="/trips/new" element={<PrivateRoute><NewTripPage /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/wallet" element={<PrivateRoute><WalletPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideNav && <BottomNavBar />}
    </div>
  )
}
