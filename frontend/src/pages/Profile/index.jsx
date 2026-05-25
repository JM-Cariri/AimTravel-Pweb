import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <main className="page-container">
      <section className="form-card">
        <p className="eyebrow">Perfil</p>
        <h1 className="page-title">Minha conta</h1>
        <p className="text-muted">Gerencie suas informações e acesse seu histórico de viagens.</p>

        <div className="section-block">
          <h2 className="section-title">Dados do usuário</h2>
          <p className="helper-text">Nome, e-mail e configurações de 2FA estarão disponíveis aqui quando o perfil estiver integrado.</p>
        </div>

        <button type="button" className="button button-secondary" onClick={handleLogout}>
          Sair
        </button>
      </section>
    </main>
  )
}
