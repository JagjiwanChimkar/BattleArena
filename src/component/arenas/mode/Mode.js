import { Grid } from "@material-ui/core";
import React from "react";
import CategoryCard from "./categoryCard/CategoryCard";
import "./Mode.css";

const Mode = ({ mode }) => {
  return (
    <div className="mode">
      {mode === "TDM" ? (
        <>
        <p>BGMI-TDM</p>
        <Grid className="modeGrid" container spacing={8}>
          <Grid item xs={12} sm={4}>
            <CategoryCard
              mode={mode}
              category={{ name: "Solo", info: "1 vs 1", img: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CategoryCard
              mode={mode}
              category={{ name: "Duo", info: "2 vs 2", img: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CategoryCard
              mode={mode}
              category={{ name: "Squad", info: "4 vs 4", img: "" }}
            />
          </Grid>
        </Grid>
        </>
      ) : (
        <>
        <p>BGMI-Classic</p>
        <Grid className="modeGrid" container alignItems="stretch" spacing={8}>
          <Grid item xs={12} sm={4}>
            <CategoryCard
              mode={mode}
              category={{ name: "Solo", info: "Solo:", img: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CategoryCard
              mode={mode}
              category={{ name: "Duo", info: "Duo:", img: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CategoryCard
              mode={mode}
              category={{ name: "Squad", info: "Squad:", img: "" }}
            />
          </Grid>
        </Grid>
        </>
      )}
    </div>
  );
};

export default Mode;
