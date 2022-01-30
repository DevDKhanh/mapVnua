import React from 'react'
import {
  MapContainer,
  useMapEvents,
  TileLayer,
  ZoomControl,
  Marker,
} from 'react-leaflet'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'
import styles from './MapLeaflet.module.scss'
import clsx from 'clsx'
import FormCoordinatesDefault from './FormDefault.js'
import images from 'app/constants/images'

function Temporary(props) {
  const [position, setPosition] = React.useState({
    lat: 21.123917697066574,
    lng: 105.79158358723559,
  })

  var greenIcon = L.icon({
    iconUrl: images.location,
    iconSize: [38, 38], // size of the icon
  })

  useMapEvents({
    click(events) {
      setPosition(events['latlng'])

      props.setCoordinates(events['latlng'])
    },
  })

  return position === null ? null : (
    <Marker position={position} icon={greenIcon}></Marker>
  )
}

const MapLeaflet = ({setIsCheckMap, inputForm, setInputForm}) => {
  const [coordinates, setCoordinates] = React.useState({
    lat: 21.123917697066574,
    lng: 105.79158358723559,
  })

  const handleCloseMap = () => {
    setIsCheckMap(false)
  }

  const handleChangeLat = (events) => {
    setCoordinates({...coordinates, lat: JSON.parse(events.target.value)})
  }

  const handleChangeLng = (events) => {
    setCoordinates({...coordinates, lng: JSON.parse(events.target.value)})
  }

  const handleClickOke = () => {
    setInputForm({...inputForm, ...coordinates})

    setIsCheckMap(false)
  }

  return (
    <React.Fragment>
      <MapContainer
        style={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          zIndex: '1000',
        }}
        center={{
          lat: 21.123917697066574,
          lng: 105.79158358723559,
        }}
        zoom={5}
        zoomControl={false}
      >
        <TileLayer
          attribution=''
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Temporary setCoordinates={setCoordinates} />
        <ZoomControl position='bottomright' />

        {/* icon off map */}
        <i
          onClick={handleCloseMap}
          className={clsx('fas fa-times', styles.iconClose)}
        />
      </MapContainer>

      {/* display coordinates */}

      <FormCoordinatesDefault
        coordinates={coordinates}
        handleChangeLat={handleChangeLat}
        handleChangeLng={handleChangeLng}
        handleClickOke={handleClickOke}
      />

      {/* <SettingForm /> */}
    </React.Fragment>
  )
}

export default MapLeaflet
