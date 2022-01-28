import {memo, useMemo, useState} from 'react'
import {ImageOverlay, useMapEvents} from 'react-leaflet'
import {LatLngBounds} from 'leaflet'

function MoveRaster({file, size, setCoordinates}) {
  const [point, setPoint] = useState({lat: 0, lng: 0})
  const img = useMemo(() => URL.createObjectURL(file), [file])
  const {h, w} = size

  useMapEvents({
    click(e) {
      const {lat, lng} = e.latlng
      setPoint({lat, lng})
    },
  })

  const bounds = useMemo(() => {
    const top = {
      lat: point.lat - h,
      lng: point.lng - w,
    }
    const bottom = {
      lat: point.lat + h,
      lng: point.lng + w,
    }
    if (point.lat !== 0 && point.lng !== 0) {
      setCoordinates({top, bottom})
    }
    return new LatLngBounds([top.lat, top.lng], [bottom.lat, bottom.lng])
  }, [point, w, h])

  return (
    <>
      <ImageOverlay url={img} bounds={bounds} zIndex={5} />
    </>
  )
}

export default memo(MoveRaster)
