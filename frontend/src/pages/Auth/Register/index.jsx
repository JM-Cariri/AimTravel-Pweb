import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../../../services/authService'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const mutation = useMutation(registerUser, {
    onSuccess: () => {
      navigate('/verify-email', { state: { email } })
    },
    onError: (error) => {
      setMessage(error.message || 'Não foi possível criar sua conta. Tente novamente.')
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('')

    if (password !== confirmPassword) {
      setMessage('As senhas precisam ser iguais.')
      return
    }

    if (password.length < 8) {
      setMessage('A senha deve ter pelo menos 8 caracteres.')
      return
    }

    mutation.mutate({ name, email, phone, password })
  }

  return (
    <main className="page-container">
      <section className="form-card">
        <p className="eyebrow">Cadastro</p>
        <h1 className="page-title">Crie sua conta</h1>
        <p className="form-tagline">Cadastre-se com seu nome, e-mail e telefone.</p>

        <form onSubmit={handleSubmit} className="content-stack">
          <div className="form-group">
            <label className="field-label" htmlFor="name">Nome completo</label>
            <input
              id="name"
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
            />
          </div>

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
            <label className="field-label" htmlFor="phone">Telefone</label>
            <input
              id="phone"
              className="input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-9999"
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

          <div className="form-group">
            <label className="field-label" htmlFor="confirmPassword">Confirmar senha</label>
            <input
              id="confirmPassword"
              className="input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              minLength={8}
              required
            />
          </div>

          {message && <p className="message message-error">{message}</p>}

          <button type="submit" className="button button-primary">
            {mutation.isLoading ? 'Carregando...' : 'Cadastrar'}
          </button>

          <button type="button" className="button button-secondary" onClick={() => setMessage('Cadastro social em breve.')}>Cadastrar com Google</button>
          <button type="button" className="button button-secondary" onClick={() => setMessage('Cadastro social em breve.')}>Cadastrar com Facebook</button>
        </form>

        <p className="helper-text">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </p>
      </section>
    </main>
  )
}
