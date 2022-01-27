import React from 'react'
import {MapContainer, useMapEvents, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {WrapperCondinates, Input} from './element'
import {ButtonElement} from '../newCreateForm/element'

function Temporary({setCoordinates}) {
  useMapEvents({
    click(events) {
      setCoordinates(events['latlng'])
    },
  })
  return null
}

const MapLeaflet = ({setIsCheckMap, inputForm, setInputForm}) => {
  const [coordinates, setCoordinates] = React.useState({lat: '', lng: ''})

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
        <Temporary setCoordinates={setCoordinates} />

        {/* icon off map */}
        <i
          onClick={handleCloseMap}
          className='fas fa-times'
          style={{
            zIndex: 1000,
            position: 'absolute',
            right: 0,
            fontSize: 20,
            padding: 20,
            cursor: 'pointer',
          }}
        ></i>
      </MapContainer>
      {/* display coordinates */}
      <WrapperCondinates>
        <Input
          type='number'
          value={coordinates && coordinates['lat']}
          onChange={handleChangeLat}
          placeholder='Tọa độ lat'
        />
        <Input
          type='number'
          value={coordinates && coordinates['lng']}
          onChange={handleChangeLng}
          placeholder='Tọa độ lng'
        />
        <ButtonElement onClick={handleClickOke}>OKE</ButtonElement>
      </WrapperCondinates>
    </React.Fragment>
  )
}

export default MapLeaflet
