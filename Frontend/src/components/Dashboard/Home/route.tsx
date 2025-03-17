import React, { useContext } from "react";
import { Layer, Source } from "react-map-gl";
import { getOverlapRouteContext } from "@/ContextApi/OverlapPathContext";

interface RouteProps {
  coordinates: number[][];
}

const Route: React.FC<RouteProps> = ({ coordinates }) => {
  const { overlapSrcDstRoute } = useContext(getOverlapRouteContext);
  return (
    <>
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
      {overlapSrcDstRoute && (
        <Source
          type="geojson"
          data={{
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates:
                overlapSrcDstRoute?.features[0]?.geometry?.coordinates,
            },
          }}
        >
          <Layer
            type="line"
            layout={{ "line-join": "round", "line-cap": "round" }}
            paint={{ "line-color": "#055BB5", "line-width": 4 }}
          />
        </Source>
      )}
    </>
  );
};

export default Route;
