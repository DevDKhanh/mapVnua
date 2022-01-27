import { memo, useEffect, useState, useMemo } from "react";

import { Polygon } from "react-leaflet";
import uploadAPI from "../../api/upload";

function Vector({ path, data }) {
  const [file, setFile] = useState([]);
  useEffect(() => {
    if (path) {
      (async () => {
        const [res] = await uploadAPI.getFile(null, path);
        console.log(res);
        setFile(res.features);
      })();
    }
  }, [path]);

  const LayerVector = useMemo(() => {
    return file.map((item, index) => {
      const polygon = item.geometry.coordinates.map((item) =>
        item.map((x) => [x[1], x[0]])
      );
      return (
        <Polygon
          key={index}
          pathOptions={{
            color: data.borderColor,
            opacity: data.opacityBorder,
            fillOpacity: data.opacityBackground,
            fillColor: data.backgroundColor,
          }}
          weight={data.widthBorder}
          positions={polygon}
        ></Polygon>
      );
    });
  }, [
    file,
    data.borderColor,
    data.opacityBorder,
    data.opacityBackground,
    data.backgroundColor,
    data.widthBorder,
  ]);
  return <>{LayerVector}</>;
}

export default memo(Vector);
