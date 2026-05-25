import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { verifyEmail, resendVerificationCode } from '../../../services/authService'

export default function VerifyEmailPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email || ''
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [info, setInfo] = useState('')

  const verifyMutation = useMutation(verifyEmail, {
    onSuccess: () => {
      setMessage('E-mail verificado com sucesso! Faça login agora.')
      navigate('/login')
    },
    onError: (error) => {
      setMessage(error.message || 'Código inválido. Tente novamente.')
    }
  })

  const resendMutation = useMutation(resendVerificationCode, {
    onSuccess: () => {
      setInfo('Código reenviado para o seu e-mail.')
    },
    onError: () => {
      setInfo('Não foi possível reenviar o código. Tente novamente.')
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('')
    verifyMutation.mutate({ email, code })
  }

  const handleResend = () => {
    setInfo('')
    if (!email) {
      setInfo('Informe seu e-mail no fluxo de cadastro para reenviar o código.')
      return
    }
    resendMutation.mutate({ email })
  }

  return (
    <main className="page-container">
      <section className="form-card">
        <p className="eyebrow">Verificação</p>
        <h1 className="page-title">Verifique seu e-mail</h1>
        <p className="form-tagline">Digite o código de 6 dígitos enviado para {email || 'seu e-mail'}.</p>

        <form onSubmit={handleSubmit} className="content-stack">
          <div className="form-group">
            <label className="field-label" htmlFor="code">Código de verificação</label>
            <input
              id="code"
              className="input"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              maxLength={6}
              required
            />
          </div>

          {message && <p className="message message-error">{message}</p>}
          {info && <p className="message">{info}</p>}

          <button type="submit" className="button button-primary">
            {verifyMutation.isLoading ? 'Carregando...' : 'Verificar'}
          </button>
          <button type="button" className="button button-secondary" onClick={handleResend}>
            Reenviar código
          </button>
        </form>

        <p className="helper-text">
          Voltar para <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  )
}
