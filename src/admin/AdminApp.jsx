import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './admin.css'
import AdminNav from './components/AdminNav'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewsList from './pages/NewsList'
import NewsEditor from './pages/NewsEditor'
import PageEditor from './pages/PageEditor'
import Media from './pages/Media'

export default function AdminApp() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="*" element={
        <ProtectedRoute>
          <div className="admin-root">
            {/* mobile hamburger */}
            <button
              className="adm-mobile-toggle"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
            >
              ☰
            </button>
            {menuOpen && <div className="adm-mobile-overlay" onClick={() => setMenuOpen(false)} />}
            <div className={`admin-sidebar-wrap${menuOpen ? ' open' : ''}`}>
              <AdminNav onClose={() => setMenuOpen(false)} />
            </div>
            <main className="admin-main">
              <Routes>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="news" element={<NewsList />} />
                <Route path="news/:id" element={<NewsEditor />} />
                <Route path="contenuti/:section" element={<PageEditor />} />
                <Route path="media" element={<Media />} />
              </Routes>
            </main>
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  )
}
