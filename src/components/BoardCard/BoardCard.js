import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 200,
    maxWidth: 275,
    minHeight: 80
  }
};

const BoardCard = ({ board, classes, onSelectBoard }) => {
  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.card}
        onClick={() => onSelectBoard(board)}
      >
        <Typography component="h2" variant="subtitle1">
          {board.board_name}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

BoardCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BoardCard);
