import React from 'react'
import {MapContainer, useMapEvents, TileLayer} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import {WrapperCondinates, Input, WrapperInput, LabelInput} from './element'
import {ButtonElement} from '../newCreateForm/element'
import styles from './MapLeaflet.module.scss'
import clsx from 'clsx'
import FormLayer from './FormLayer.js'
import FormCoordinatesDefault from './FormDefault.js'
import FormLayerCoordinates from './FormLayer.js'

function Temporary(props) {
  let countClick = React.useRef(0)

  useMapEvents({
    click(events) {
      if (props.isLayer) {
        ++countClick.current

        if (countClick.current % 2 !== 0) {
          const latSW = events.latlng.lat
          const lngSW = events.latlng.lng

          props.setcoordinatesTop({latSW, lngSW})
        } else {
          const latNE = events.latlng.lat
          const lngNE = events.latlng.lng

          props.setcoordinatesBottom({latNE, lngNE})
        }
      } else {
        props.setCoordinates(events['latlng'])
      }
    },
  })

  return null
}

const MapLeaflet = ({setIsCheckMap, inputForm, setInputForm, isLayer}) => {
  const [coordinates, setCoordinates] = React.useState({lat: '', lng: ''})

  const [coordinatesTop, setCoordinatesTop] = React.useState({
    latSW: '',
    lngSW: '',
  })
  const [coordinatesBottom, setCoordinatesBottom] = React.useState({
    latNE: '',
    lngNE: '',
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

  const handleChangelatSW = (events) => {
    setCoordinatesTop({
      ...coordinatesTop,
      latSW: JSON.parse(events.target.value),
    })
  }

  const handleChangeLngSW = (events) => {
    setCoordinatesTop({
      ...coordinatesTop,
      lngSW: JSON.parse(events.target.value),
    })
  }

  const handleChangeLatNE = (events) => {
    setCoordinatesBottom({
      ...coordinatesBottom,
      latNE: JSON.parse(events.target.value),
    })
  }

  const handleChangeLngNE = (events) => {
    setCoordinatesBottom({
      ...coordinatesBottom,
      lngNE: JSON.parse(events.target.value),
    })
  }

  const handleClickOke = () => {
    if (isLayer) {
      const coordinatesLayer = {...coordinatesTop, ...coordinatesBottom}

      setInputForm({...inputForm, ...coordinatesLayer})

      setIsCheckMap(false)
    } else {
      setInputForm({...inputForm, ...coordinates})

      setIsCheckMap(false)
    }
  }

  return (
    <React.Fragment>
      <MapContainer
        style={{
          height: '90%',
          width: '80%',
          position: 'absolute',
          zIndex: '1000',
        }}
        center={{lat: 51.505, lng: -0.09}}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Temporary
          setCoordinates={setCoordinates}
          isLayer={isLayer}
          setcoordinatesTop={setCoordinatesTop}
          setcoordinatesBottom={setCoordinatesBottom}
        />

        {/* icon off map */}
        <i
          onClick={handleCloseMap}
          className={clsx('fas fa-times', styles.iconClose)}
        />
      </MapContainer>

      {/* display coordinates */}
      {isLayer ? (
        <FormLayerCoordinates
          coordinatesTop={coordinatesTop}
          handleChangelatSW={handleChangelatSW}
          handleChangeLngSW={handleChangeLngSW}
          coordinatesBottom={coordinatesBottom}
          handleChangeLatNE={handleChangeLatNE}
          handleChangeLngNE={handleChangeLngNE}
          handleClickOke={handleClickOke}
        />
      ) : (
        <FormCoordinatesDefault
          coordinates={coordinates}
          handleChangeLat={handleChangeLat}
          handleChangeLng={handleChangeLng}
          handleClickOke={handleClickOke}
        />
      )}
    </React.Fragment>
  )
}

export default MapLeaflet
