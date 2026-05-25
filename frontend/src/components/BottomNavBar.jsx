import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Compass, Wallet, User } from 'lucide-react'

const items = [
  { label: 'Feed', to: '/', icon: Home },
  { label: 'Explore', to: '/explore', icon: Compass },
  { label: 'Wallet', to: '/wallet', icon: Wallet },
  { label: 'Perfil', to: '/profile', icon: User }
]

export default function BottomNavBar() {
  return (
    <nav className="bottom-nav">
      {items.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `bottom-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <Icon size={24} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
