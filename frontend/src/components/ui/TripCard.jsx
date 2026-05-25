import React from 'react'
import { Link } from 'react-router-dom'
import { Camera, Heart } from 'lucide-react'

function isValidUrl(value) {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export default function TripCard({ trip }) {
  const {
    id,
    destino = 'Destino desconhecido',
    custo_total = 0,
    curtidas = 0,
    fotos = [],
    autor_nome = 'Viajante',
  } = trip || {}

  const coverPhoto = Array.isArray(fotos) && fotos.length > 0 && isValidUrl(fotos[0]) ? fotos[0] : null
  const hasPhoto = Boolean(coverPhoto)

  const cardStyle = {
    background: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    overflow: 'hidden'
  }

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    display: 'block'
  }

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '16px 16px 0 0',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${coverPhoto})`
  }

  const placeholderStyle = {
    width: '100%',
    height: '200px',
    background: '#F8F9FA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px 16px 0 0'
  }

  const bodyStyle = {
    padding: '16px',
    fontFamily: 'Inter, system-ui, -apple-system'
  }

  const destinoStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '8px',
    margin: '0 0 8px 0'
  }

  const costoStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0077B6'
  }

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px'
  }

  const autorStyle = {
    fontSize: '12px',
    color: '#6C757D'
  }

  const likesContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  }

  const likesTextStyle = {
    fontSize: '12px',
    color: '#6C757D'
  }

  return (
    <article style={cardStyle}>
      <Link to={`/trips/${id}`} style={linkStyle}>
        {hasPhoto ? (
          <div style={imageStyle} />
        ) : (
          <div style={placeholderStyle}>
            <Camera size={40} color="#6C757D" />
          </div>
        )}
        <div style={bodyStyle}>
          <h3 style={destinoStyle}>{destino}</h3>
          <div style={{ marginBottom: '8px' }}>
            <span style={costoStyle}>R$ {custo_total}</span>
          </div>
          <div style={footerStyle}>
            <span style={autorStyle}>{autor_nome}</span>
            <div style={likesContainerStyle}>
              <Heart size={16} color="#E63946" fill="#E63946" />
              <span style={likesTextStyle}>{curtidas}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
