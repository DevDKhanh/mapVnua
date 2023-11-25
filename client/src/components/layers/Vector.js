import { GeoJSON, useMap, useMapEvents } from "react-leaflet";
import {
  convertDataColor,
  convertDataColor2,
} from "../../common/func/colorConvert";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { API } from "../../constant/config";
import L from "leaflet";
import uploadAPI from "../../api/upload";

function Vector({ path, data }) {
  const [file, setFile] = useState();
  const map = useMap();

  const mapEvents = useMapEvents({
    zoomend: () => {
      mapEvents.eachLayer(function (layer) {
        if (mapEvents.getZoom() < 10) {
          layer?._container?.classList?.add("hidden-label");
        } else {
          layer?._container?.classList?.remove("hidden-label");
        }
      });
    },
    viewreset: () => {
      mapEvents.eachLayer(function (layer) {
        if (mapEvents.getZoom() < 10) {
          layer?._container?.classList?.add("hidden-label");
        } else {
          layer?._container?.classList?.remove("hidden-label");
        }
      });
    },
  });

  const icon = useMemo(
    () =>
      new L.Icon({
        iconUrl: `${API}/upload${data.icon}`,
        iconSize: [26, 26],
        popupAnchor: [0, -15],
        shadowAnchor: [13, 28],
        interactive: true,
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
      }),
    [data.icon]
  );

  useEffect(() => {
    if (path) {
      (async () => {
        const [res] = await uploadAPI.getFile(null, path);
        setFile(res);
      })();
    }
  }, [path]);

  const dataColor = useMemo(
    () =>
      data.typeColor === 0
        ? convertDataColor(data.dataColor)
        : convertDataColor2(data.dataColor),
    [data.dataColor, data.typeColor]
  );

  const getInfo = (data) => {
    const info = [];
    for (let i in data) {
      info.push(`<div>
                    <p>
                        <b>${i}: </b> ${data[i]}
                    </p>
                </div>`);
    }
    return info;
  };

  const handleEachInfo = (info, layer) => {
    const { properties } = info;
    if (data?.activeTooltip === 1) {
      layer.bindPopup(getInfo(properties).join(""));
      if (data?.labelMap && data?.displayLabel)
        layer.bindTooltip(`${properties[data?.labelMap]}`, {
          permanent: true,
          direction: "center",
          className: `countryLabel ${map.getZoom() < 10 ? "hidden-label" : ""}`,
        });
    }

    layer.on({
      mouseover: () => {
        if (layer?.setStyle) {
          layer.setStyle({
            fillColor: setColor(properties[`${data.keyColor}`], 1, dataColor),
            color: "yellow",
            weight: 4,
            zIndex: 1,
          });
        }

        if (layer.setIcon) {
          layer.setIcon(
            new L.Icon({
              iconUrl: `${API}/upload${data.icon}`,
              iconSize: [35, 35],
              popupAnchor: [0, -15],
              shadowAnchor: [13, 28],
              interactive: true,
              shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
            })
          );
        }
      },
      mouseout: () => {
        if (layer?.setStyle) {
          layer.setStyle({
            color: setColor(properties[`${data.keyColor}`], 0, dataColor),
            opacity: data.opacityBorder,
            weight: data.widthBorder,
            fillOpacity: data.opacityBackground,
            fillColor: setColor(properties[`${data.keyColor}`], 1, dataColor),
            zIndex: 1,
          });
        }
        if (layer?.setIcon) {
          layer.setIcon(
            new L.Icon({
              iconUrl: `${API}/upload${data.icon}`,
              iconSize: [26, 26],
              popupAnchor: [0, -15],
              shadowAnchor: [13, 28],
              interactive: true,
              shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
            })
          );
        }
      },
    });
  };

  const handleCustomMarker = useCallback(
    (feature, latlng) => {
      return L.marker(latlng, {
        icon,
      });
    },
    [icon]
  );

  const setColor = useCallback(
    (d, t, l) => {
      if (!!d) {
        for (let i of l) {
          if (data.typeColor === 0 && d >= i.from && d <= i.to) {
            return i.color;
          }

          if (data.typeColor === 1 && d == i.value) {
            return i.color;
          }
        }
      }

      return t ? data.backgroundColor : data.borderColor;
    },
    [data.backgroundColor, data.borderColor, data.typeColor]
  );

  const handleStyle = useCallback(
    (info, layer) => {
      const { properties } = info;

      return {
        color: setColor(properties[`${data.keyColor}`], 0, dataColor),
        opacity: data.opacityBorder,
        weight: data.widthBorder,
        fillOpacity: data.opacityBackground,
        fillColor: setColor(properties[`${data.keyColor}`], 1, dataColor),
        zIndex: 1,
      };
    },
    [
      data.keyColor,
      data.opacityBackground,
      data.opacityBorder,
      data.widthBorder,
      dataColor,
      setColor,
    ]
  );

  return (
    <>
      {file && (
        <GeoJSON
          data={file}
          style={handleStyle}
          pointToLayer={handleCustomMarker}
          onEachFeature={handleEachInfo}
        />
      )}
    </>
  );
}

export default memo(Vector);
