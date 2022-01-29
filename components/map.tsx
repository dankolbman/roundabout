import { Fragment, useState } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const geojson = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: [
      [-26.203888, 28.061397],
      [28.061397, -26.203888],
      [28.061363, -26.203884],
      [28.061506, -26.203892],
      [28.061523, -26.203872],
      [28.061134, -26.20389],
      [28.061203, -26.203876],
      [28.061203, -26.203876],
      [28.061066, -26.203884],
      [28.061066, -26.203884],
      [28.061066, -26.203884],
      [28.061249, -26.203951],
      [28.061249, -26.203951],
      [28.06118, -26.203881],
      [28.06118, -26.203881],
      [28.06118, -26.203881],
      [28.060997, -26.203877],
      [28.061157, -26.203885],
      [28.061089, -26.203879],
      [28.061134, -26.20389],
      [28.061399, -26.20383],
      [28.061402, -26.203824],
      [28.061409, -26.203824],
      [28.06118, -26.203965],
      [28.06118, -26.203965],
      [28.061294, -26.203856],
      [28.061294, -26.203856],
      [28.061425, -26.203825],
      [28.061426, -26.203814],
      [28.06143, -26.203806],
      [28.06134, -26.203868],
      [28.06134, -26.203868],
    ].map((v) => [v[1], v[0]]),
  },
};

const layerStyle = {
  id: "line",
  type: "line",
  paint: {
    "line-color": "#FF0000",
  },
};

type MapProps = {
  tripId: string;
};

export default function Map({ tripId }: MapProps) {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: -26,
    longitude: 28,
    zoom: 5,
  });

  return (
    <>
      <div className="h-full max-h-96 bg-stone-300">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoiZGFuazUyOCIsImEiOiJja3owZ2N1cjIxYWRiMnp0YjVlN2o1Mzh4In0.fLO4uMzR-1q7XZwttnadNA"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </ReactMapGL>
      </div>
    </>
  );
}
