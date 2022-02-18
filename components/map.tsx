import { Fragment, useEffect, useState } from "react";
import ReactMapGL, { Source, Layer, WebMercatorViewport } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const layerStyle = {
  id: "line",
  type: "line",
  paint: {
    "line-color": "#0284C7",
  },
};

type MapProps = {
  tripId: string;
  geoJSON: any;
};

export default function Map({ tripId, geoJSON }: MapProps) {
  if (!geoJSON) return <div>loading</div>;

  const getBounds = () => {
    var bounds = { xMin: 180, xMax: -180, yMin: 180, yMax: -180 };

    geoJSON.geometry.coordinates.forEach((coord) => {
      let longitude = coord[0];
      let latitude = coord[1];
      bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
      bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
      bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
      bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
    });

    return [
      [bounds.xMin, bounds.yMin],
      [bounds.xMax, bounds.yMax],
    ];
  };

  const view = new WebMercatorViewport({ width: 800, height: 600 }).fitBounds(
    getBounds(),
    {
      padding: 20,
      offset: [0, -100],
    }
  );

  const [viewport, setViewport] = useState({ ...view });

  useEffect(() => {
    const view = new WebMercatorViewport({ width: 800, height: 600 }).fitBounds(
      getBounds(),
      {
        padding: 20,
        offset: [0, -100],
      }
    );
    setViewport({ ...view });
  }, [geoJSON]);

  return (
    <>
      <div className="h-full max-h-96 bg-stone-300">
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapboxApiAccessToken="pk.eyJ1IjoiZGFuazUyOCIsImEiOiJja3owZ2N1cjIxYWRiMnp0YjVlN2o1Mzh4In0.fLO4uMzR-1q7XZwttnadNA"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          <Source id="my-data" type="geojson" data={geoJSON}>
            <Layer {...layerStyle} />
          </Source>
        </ReactMapGL>
      </div>
    </>
  );
}
