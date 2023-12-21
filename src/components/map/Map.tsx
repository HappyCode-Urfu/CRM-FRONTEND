import { YMaps, Map, Placemark, ZoomControl, GeolocationControl } from 'react-yandex-maps'

interface MapsProps {
  latitude: number | undefined
  longitude: number | undefined
}

const Maps = ({ latitude = 0, longitude = 0 }: MapsProps) => {
  return (
    <YMaps query={{ lang: 'ru_RU', apikey: import.meta.env.VITE_API_KEY_YANDEX_MAP }}>
      <Map
        defaultState={{ center: [longitude, latitude], zoom: 15 }}
        width={'100%'}
        height={'500px'}
      >
        <GeolocationControl options={{ float: 'right' }} />
        <ZoomControl options={{ float: 'left' }} />
        <Placemark geometry={[longitude, latitude]} />
      </Map>
    </YMaps>
  )
}

export default Maps
