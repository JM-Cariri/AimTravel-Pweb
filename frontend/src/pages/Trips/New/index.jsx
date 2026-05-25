import React, { useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createTrip } from '../../../services/tripsService'

const initialForm = {
  destination: '',
  type: '',
  startDate: '',
  endDate: '',
  transport: '',
  accommodation: '',
  food: '',
  activities: '',
  spotInput: '',
  spots: [],
  description: '',
  photos: []
}

export default function NewTripPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [previews, setPreviews] = useState([])
  const [message, setMessage] = useState('')

  const mutation = useMutation(createTrip, {
    onSuccess: () => {
      navigate('/')
    },
    onError: (error) => {
      setMessage(error.message || 'Não foi possível criar o relato. Tente novamente.')
    }
  })

  const totalCost = useMemo(() => {
    const values = [form.transport, form.accommodation, form.food, form.activities].map((value) => Number(value) || 0)
    return values.reduce((sum, value) => sum + value, 0)
  }, [form.transport, form.accommodation, form.food, form.activities])

  const handleInput = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const addSpot = () => {
    const name = form.spotInput.trim()
    if (!name) return
    setForm((current) => ({
      ...current,
      spotInput: '',
      spots: [...current.spots, name]
    }))
  }

  const handlePhotosChange = (event) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) return

    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setPreviews((current) => [...current, ...newPreviews])
    setForm((current) => ({ ...current, photos: [...current.photos, ...files] }))
  }

  const handleNext = () => {
    setMessage('')
    if (step === 1) {
      if (!form.destination || !form.type || !form.startDate || !form.endDate) {
        setMessage('Preencha todos os campos da etapa 1 para continuar.')
        return
      }
    }
    if (step === 2) {
      if (!form.transport || !form.accommodation || !form.food || !form.activities || form.spots.length === 0) {
        setMessage('Adicione custos e pelo menos um ponto turístico na etapa 2.')
        return
      }
    }
    setStep((prev) => Math.min(prev + 1, 3))
  }

  const handleBack = () => {
    setMessage('')
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('')
    if (!form.description || form.photos.length === 0) {
      setMessage('Adicione descrição e ao menos uma foto na etapa 3.')
      return
    }

    const payload = {
      destination: form.destination,
      type: form.type,
      date_start: form.startDate,
      date_end: form.endDate,
      costs: {
        transport: Number(form.transport) || 0,
        accommodation: Number(form.accommodation) || 0,
        food: Number(form.food) || 0,
        activities: Number(form.activities) || 0
      },
      total_cost: totalCost,
      tourist_spots: form.spots.map((name) => ({ name })),
      description: form.description,
      photos: previews
    }

    mutation.mutate(payload)
  }

  return (
    <main className="page-container">
      <section className="form-card">
        <p className="eyebrow">Novo relato</p>
        <h1 className="page-title">Criar relato</h1>
        <p className="form-tagline">Preencha as três etapas para publicar um relato de viagem.</p>

        <div className="filter-bar">
          <span className={`chip ${step === 1 ? 'chip-active' : ''}`}>1</span>
          <span className={`chip ${step === 2 ? 'chip-active' : ''}`}>2</span>
          <span className={`chip ${step === 3 ? 'chip-active' : ''}`}>3</span>
        </div>

        <form onSubmit={handleSubmit} className="content-stack">
          {step === 1 && (
            <>
              <div className="form-group">
                <label className="field-label" htmlFor="destination">Destino</label>
                <input
                  id="destination"
                  className="input"
                  type="text"
                  value={form.destination}
                  onChange={(event) => handleInput('destination', event.target.value)}
                  placeholder="Cidade, país"
                  required
                />
              </div>

              <div className="form-group">
                <label className="field-label" htmlFor="type">Tipo de viagem</label>
                <select
                  id="type"
                  className="select"
                  value={form.type}
                  onChange={(event) => handleInput('type', event.target.value)}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="aerea">Aérea</option>
                  <option value="terrestre">Terrestre</option>
                  <option value="maritima">Marítima</option>
                </select>
              </div>

              <div className="form-group">
                <label className="field-label">Datas</label>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <input
                    className="input"
                    type="date"
                    value={form.startDate}
                    onChange={(event) => handleInput('startDate', event.target.value)}
                    required
                  />
                  <input
                    className="input"
                    type="date"
                    value={form.endDate}
                    onChange={(event) => handleInput('endDate', event.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label className="field-label" htmlFor="transport">Transporte</label>
                <input
                  id="transport"
                  className="input"
                  type="number"
                  min="0"
                  value={form.transport}
                  onChange={(event) => handleInput('transport', event.target.value)}
                  placeholder="R$ 0"
                  required
                />
              </div>

              <div className="form-group">
                <label className="field-label" htmlFor="accommodation">Hospedagem</label>
                <input
                  id="accommodation"
                  className="input"
                  type="number"
                  min="0"
                  value={form.accommodation}
                  onChange={(event) => handleInput('accommodation', event.target.value)}
                  placeholder="R$ 0"
                  required
                />
              </div>

              <div className="form-group">
                <label className="field-label" htmlFor="food">Alimentação</label>
                <input
                  id="food"
                  className="input"
                  type="number"
                  min="0"
                  value={form.food}
                  onChange={(event) => handleInput('food', event.target.value)}
                  placeholder="R$ 0"
                  required
                />
              </div>

              <div className="form-group">
                <label className="field-label" htmlFor="activities">Passeios</label>
                <input
                  id="activities"
                  className="input"
                  type="number"
                  min="0"
                  value={form.activities}
                  onChange={(event) => handleInput('activities', event.target.value)}
                  placeholder="R$ 0"
                  required
                />
              </div>

              <div className="form-group">
                <label className="field-label" htmlFor="spotInput">Pontos turísticos</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <input
                    id="spotInput"
                    className="input"
                    type="text"
                    value={form.spotInput}
                    onChange={(event) => handleInput('spotInput', event.target.value)}
                    placeholder="Nome do ponto"
                  />
                  <button type="button" className="button button-secondary" onClick={addSpot}>Adicionar</button>
                </div>
                {form.spots.length > 0 && (
                  <div className="helper-text">Pontos adicionados: {form.spots.join(', ')}</div>
                )}
              </div>

              <div className="form-group">
                <div className="badge">Total estimado: R$ {totalCost}</div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="form-group">
                <label className="field-label" htmlFor="description">Descrição</label>
                <textarea
                  id="description"
                  className="textarea"
                  value={form.description}
                  onChange={(event) => handleInput('description', event.target.value)}
                  placeholder="Conte sua experiência..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="field-label" htmlFor="photos">Fotos</label>
                <input
                  id="photos"
                  className="input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotosChange}
                />
                {previews.length > 0 && (
                  <div className="photo-preview-grid">
                    {previews.map((src, index) => (
                      <img key={index} className="photo-preview" src={src} alt={`preview-${index}`} />
                    ))}
                  </div>
                )}
                <p className="helper-text">Selecione até 10 imagens para ilustrar o relato.</p>
              </div>
            </>
          )}

          {message && <p className="message message-error">{message}</p>}

          <div className="form-actions">
            {step > 1 && (
              <button type="button" className="button button-secondary" onClick={handleBack}>Voltar</button>
            )}
            {step < 3 ? (
              <button type="button" className="button button-primary" onClick={handleNext}>Próxima etapa</button>
            ) : (
              <button type="submit" className="button button-cta">
                {mutation.isLoading ? 'Publicando...' : 'Publicar relato'}
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  )
}
