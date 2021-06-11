import * as React from "react";
import { filterRecipes } from "../../services/recipesService";
import { TextField, CssBaseline, Grid } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import { makeStyles } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import Recipe from "./RecipeItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    margin: "20px",
  },
  gridList: {
    flexWrap: "wrap",
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function Recent() {
  const classes = useStyles();
  const [user, setUser] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);

  let recipes = filterRecipes(user, keywords).slice(0, 10);

  const content = (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {recipes.map((recipe, i) => (
          <Recipe props={recipe} style={{ margin: "5px" }} />
        ))}
      </GridList>
    </div>
  );
  
  function handleChange(field, e) {
    if (field === "keywords") {
      let newElement = e[e.length - 1];
      if (keywords.indexOf(newElement) === -1) {
        setKeywords([...keywords, newElement]);
      }
    } else {
      setUser(e.target.value);
    }
  }

  function handleDeleteChip(keyword) {
    setKeywords(
      keywords.filter(function (item) {
        return item !== keyword;
      })
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <form style={{ padding: "10px" }} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={6} sm={2} style={{ paddingTop: "0px" }}>
            <ChipInput
              fullWidth
              label="Keywords"
              value={keywords}
              onChange={handleChange.bind(this, "keywords")}
              onDelete={(chip, index) => handleDeleteChip(chip, index)}
            />
          </Grid>

          <Grid item xs={6} sm={2}>
            <TextField
              name="user"
              label="Posted by..."
              fullWidth
              id="user"
              value={user}
              onChange={handleChange.bind(this, "user")}
            />
          </Grid>
        </Grid>
      </form>

      {content}
    </React.Fragment>
  );
}
