import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { fetchTrips } from '../../services/tripsService'
import TripCard from '../../components/ui/TripCard'

const tripTypes = [
  { label: 'Todos', value: '' },
  { label: 'Aérea', value: 'aerea' },
  { label: 'Terrestre', value: 'terrestre' },
  { label: 'Marítima', value: 'maritima' }
]

export default function FeedPage() {
  const [filterType, setFilterType] = useState('')
  const { data, isLoading, error } = useQuery({
    queryKey: ['trips', filterType],
    queryFn: async () => fetchTrips({ type: filterType }),
    keepPreviousData: true
  })

  const trips = data?.trips || []

  return (
    <main className="page-container">
      <header className="page-header">
        <div>
          <p className="eyebrow">Bem-vindo ao AimTravel</p>
          <h1 className="page-title">Feed de Relatos</h1>
        </div>
      </header>

      <section className="filter-bar">
        {tripTypes.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`chip ${filterType === option.value ? 'chip-active' : ''}`}
            onClick={() => setFilterType(option.value)}
          >
            {option.label}
          </button>
        ))}
      </section>

      <section className="content-stack">
        {isLoading && <p className="message">Carregando...</p>}
        {error && <p className="message message-error">Não foi possível carregar o feed. Tente novamente.</p>}
        {!isLoading && !error && trips.length === 0 && (
          <p className="message">Ainda não há relatos. Seja o primeiro a compartilhar!</p>
        )}
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </section>

      <Link to="/trips/new" className="fab" aria-label="Criar relato">
        <Plus size={28} color="#FFFFFF" />
      </Link>
    </main>
  )
}
