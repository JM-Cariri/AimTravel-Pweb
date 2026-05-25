import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../../../contexts/AuthContext'
import { loginUser } from '../../../services/authService'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      const token = data?.data?.token || data?.token
      if (token) {
        login(token)
        navigate('/')
      } else {
        setMessage('Login realizado, mas não foi possível salvar o token.')
      }
    },
    onError: (error) => {
      setMessage(error.message || 'E-mail ou senha incorretos. Tente novamente.')
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    mutation.mutate({ email, password })
  }

  return (
    <main className="page-container">
      <section className="form-card">
        <p className="eyebrow">Entrar</p>
        <h1 className="page-title">Acesse sua conta</h1>
        <p className="form-tagline">Use seu e-mail e senha para entrar no AimTravel.</p>

        <form onSubmit={handleSubmit} className="content-stack">
          <div className="form-group">
            <label className="field-label" htmlFor="email">E-mail</label>
            <input
              id="email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="field-label" htmlFor="password">Senha</label>
            <input
              id="password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              minLength={8}
              required
            />
          </div>

          {message && <p className="message message-error">{message}</p>}

          <button type="submit" className="button button-primary">
            {mutation.isLoading ? 'Carregando...' : 'Entrar'}
          </button>

          <button type="button" className="button button-secondary" onClick={() => setMessage('Login social em breve.')}>Entrar com Google</button>
          <button type="button" className="button button-secondary" onClick={() => setMessage('Login social em breve.')}>Entrar com Facebook</button>
        </form>

        <p className="helper-text">
          Não tem conta? <Link to="/register">Criar conta</Link>
        </p>
        <p className="helper-text">
          Já cadastrou seu e-mail? <Link to="/verify-email">Verificar código</Link>
        </p>
      </section>
    </main>
  )
}
