import { Grid } from "@material-ui/core";
import React from "react";
import CategoryCard from "./categoryCard/CategoryCard";
import './Mode.css'

const Mode = ({ mode }) => {
  return mode === "TDM" ? (
  
    <Grid className="mode"
      container
      spacing={1}
    >
      <Grid item xs={12} sm={4}>
        <CategoryCard 
          mode={mode}
          category={{ name: "solo", info: "Solo:", img: "" }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
      <CategoryCard
        mode={mode}
        category={{ name: "duo", info: "Duo:", img: "" }}
      />
      </Grid>
      <Grid item xs={12} sm={4}>
      <CategoryCard
        mode={mode}
        category={{ name: "squad", info: "Squad:", img: "" }}
      />
      </Grid>
    </Grid>
  ) : (
    <Grid className="mode"
    container
    alignItems="stretch"
    spacing={1}>
      <Grid item xs={12} sm={4}>
      <CategoryCard
        mode={mode}
        category={{ name: "solo", info: "1 vs 1", img: "" }}
      />
      </Grid>
      <Grid item xs={12} sm={4}>
      <CategoryCard
        mode={mode}
        category={{ name: "duo", info: "2 vs 2", img: "" }}
      />
      </Grid>
      <Grid item xs={12} sm={4}>
      <CategoryCard
        mode={mode}
        category={{ name: "squad", info: "4 vs 4", img: "" }}
      />
      </Grid>
    </Grid>
  );
};

export default Mode;
