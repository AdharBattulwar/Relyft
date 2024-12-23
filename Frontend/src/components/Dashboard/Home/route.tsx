import React from "react";
import { Layer, Source } from "react-map-gl";

interface RouteProps {
  coordinates: number[][];
}

const Route: React.FC<RouteProps> = ({ coordinates }) => {
  return (
    <Source
      type="geojson"
      data={{
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates,
        },
      }}
    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "round" }}
        paint={{ "line-color": "#46c96b", "line-width": 4 }}
      />
    </Source>
  );
};

export default Route;
