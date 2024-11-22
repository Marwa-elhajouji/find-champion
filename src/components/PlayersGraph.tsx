import { Box, Typography } from "@mui/material";
import {
  ResponsiveScatterPlotCanvas,
  ScatterPlotDatum,
  ScatterPlotRawSerie,
} from "@nivo/scatterplot";
import React from "react";
import { Player } from "../validation/schemas/playerSchema";
const PlayersGraph = ({
  champions,
  data: scatterData,
}: {
  champions: Player[];
  data: ScatterPlotRawSerie<ScatterPlotDatum>[];
}) => {
  return (
    <>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ marginBottom: 2 }}
      >
        Graphique des joueurs et champions
      </Typography>
      <Box sx={{ height: 500, marginBottom: 4 }}>
        <ResponsiveScatterPlotCanvas
          nodeSize={(node) =>
            champions.some(
              (champion) =>
                champion.age === node.data.x && champion.score === node.data.y
            )
              ? 15
              : 10
          }
          data={scatterData}
          margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
          xScale={{ type: "linear", min: 0, max: "auto" }}
          yScale={{ type: "linear", min: 0, max: "auto" }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            legend: "Âge",
            legendPosition: "middle",
            legendOffset: 46,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            legend: "Score",
            legendPosition: "middle",
            legendOffset: -60,
          }}
          colors={{ scheme: "nivo" }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              translateX: 130,
              itemWidth: 100,
              itemHeight: 12,
              symbolSize: 12,
            },
          ]}
        />
      </Box>
    </>
  );
};
export default PlayersGraph;
