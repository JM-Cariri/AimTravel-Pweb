import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { fetchTrip } from '../../services/tripsService'

export default function TripDetailPage() {
  const { id } = useParams()
  const { data, isLoading, error } = useQuery({
    queryKey: ['trip', id],
    queryFn: async () => fetchTrip(id),
    enabled: !!id
  })

  if (isLoading) return <p className="message">Carregando...</p>
  if (error) return <p className="message message-error">Não foi possível carregar o relato.</p>
  if (!data) return <p className="message">Relato não encontrado.</p>

  const trip = data
  const primaryPhoto = (trip.photos || [])[0]

  return (
    <main className="page-container">
      <div className="page-header">
        <Link to="/" className="link-back">← Voltar</Link>
        <span className="badge">Detalhe</span>
      </div>

      <section className="card detail-card">
        {primaryPhoto ? (
          <img className="detail-cover" src={primaryPhoto} alt={trip.destination || 'Foto do relato'} />
        ) : (
          <div className="detail-cover placeholder">Sem foto disponível</div>
        )}

        <div className="detail-body">
          <h1 className="page-title">{trip.title || trip.destination}</h1>
          <p className="text-muted">{trip.description || 'Sem descrição disponível.'}</p>

          <div className="detail-row">
            <span className="detail-label">Destino</span>
            <strong>{trip.destination || 'Não informado'}</strong>
          </div>
          <div className="detail-row">
            <span className="detail-label">Tipo de viagem</span>
            <strong>{trip.type || 'Não informado'}</strong>
          </div>

          <div className="cost-grid">
            <div className="cost-card">
              <span>Transporte</span>
              <strong>R$ {trip.costs?.transport || 0}</strong>
            </div>
            <div className="cost-card">
              <span>Hospedagem</span>
              <strong>R$ {trip.costs?.accommodation || 0}</strong>
            </div>
            <div className="cost-card">
              <span>Alimentação</span>
              <strong>R$ {trip.costs?.food || 0}</strong>
            </div>
            <div className="cost-card">
              <span>Passeios</span>
              <strong>R$ {trip.costs?.activities || 0}</strong>
            </div>
          </div>

          <div className="summary-row">
            <span>Total</span>
            <strong>R$ {trip.total_cost || 0}</strong>
          </div>

          <div className="section-block">
            <h2 className="section-title">Pontos Turísticos</h2>
            <ul className="bullet-list">
              {(trip.tourist_spots || []).map((spot, index) => (
                <li key={index}>{spot.name || 'Ponto desconhecido'}</li>
              ))}
            </ul>
          </div>

          <div className="section-block">
            <h2 className="section-title">Curtidas</h2>
            <button type="button" className="button button-secondary">
              <Heart size={16} /> {trip.likes || trip.curtidas || 0} Curtidas
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
