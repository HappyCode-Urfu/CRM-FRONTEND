import { YMaps, Map, Placemark } from 'react-yandex-maps'
import { useState } from 'react'

interface MapsProps {
  latitude: number
  longitude: number
}

const Maps = ({ latitude, longitude }: MapsProps) => {
  const [mapState, setMapState] = useState({
    center: [latitude, longitude],
    zoom: 8,
  })

  return (
    <YMaps query={{ lang: 'ru_RU', apikey: import.meta.env.VITE_API_KEY_YANDEX_MAP }}>
      <Map
        state={mapState}
        width={'500px'}
        height={'300px'}
        onChange={(event) => setMapState(event.originalEvent.state)}
      >
        <Placemark geometry={mapState.center} />
      </Map>
    </YMaps>
  )
}

export default Maps
