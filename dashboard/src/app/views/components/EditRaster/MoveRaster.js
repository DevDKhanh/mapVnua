import {memo, useMemo, useState, useRef, useCallback, useEffect} from 'react'
import {ImageOverlay, useMapEvents, Marker, Popup} from 'react-leaflet'
import L, {LatLngBounds} from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
})

function MoveRaster({file, setCoordinates}) {
  const markerRefTop = useRef(null)
  const markerRefBottom = useRef(null)

  const [point, setPoint] = useState({
    top: {lat: 15, lng: 108},
    bottom: {lat: 14, lng: 107},
  })
  const img = useMemo(() => URL.createObjectURL(file), [file])

  useEffect(() => {
    setCoordinates(point)
  }, [point])

  //Di chuyen anh khi dbclick
  useMapEvents({
    dblclick(e) {
      const {lat, lng} = e.latlng
      const top = {
        lat: lat + 1,
        lng: lng + 1,
      }
      const bottom = {
        lat: lat - 1,
        lng: lng - 1,
      }

      setPoint({
        top,
        bottom,
      })
    },
  })

  const eventHandlers = useMemo(
    () => ({
      drag() {
        const markerTop = markerRefTop.current
        if (markerTop != null) {
          const {lat, lng} = markerTop.getLatLng()
          setPoint((prev) => ({
            ...prev,
            top: {lat, lng},
          }))
        }
        const markerBottom = markerRefBottom.current
        if (markerBottom != null) {
          const {lat, lng} = markerBottom.getLatLng()
          setPoint((prev) => ({
            ...prev,
            bottom: {lat, lng},
          }))
        }
      },
    }),
    []
  )

  const handleDrag = () => {
    const {top, bottom} = point
    return new LatLngBounds([top.lat, top.lng], [bottom.lat, bottom.lng])
  }

  return (
    <>
      <ImageOverlay url={img} bounds={handleDrag()} zIndex={5} />

      <Marker
        position={[point.top.lat, point.top.lng]}
        draggable={true}
        eventHandlers={eventHandlers}
        ref={markerRefTop}
      ></Marker>
      <Marker
        position={[point.bottom.lat, point.bottom.lng]}
        draggable={true}
        eventHandlers={eventHandlers}
        ref={markerRefBottom}
      />
    </>
  )
}

export default memo(MoveRaster)
