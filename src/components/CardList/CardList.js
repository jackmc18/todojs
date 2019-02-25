import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AppCard from "../AppCard/AppCard";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Paper from "@material-ui/core/Paper";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  cardListPaper: {
    width: 275
  }
});

const initialState = {
  listName: "",
  listId: null,
  cards: [],
  addCardToggle: false,
  addCardContent: ""
};

class CardList extends React.Component {
  state = initialState;

  componentDidMount() {
    this.handleUpdateListState();
  }

  componentDidUpdate() {
    this.handleUpdateListState();
  }

  handleUpdateListState = () => {
    const { cardList } = this.props;
    const { listId, listName, cards } = this.state;
    if (
      cardList.listId !== listId ||
      cardList.listName !== listName ||
      cardList.cards !== cards
    ) {
      this.setState({
        cards: cardList.cards,
        listName: cardList.listName,
        listId: cardList.listId,
        addCardToggle: false,
        addCardContent: ""
      });
    }
  };

  onAddCardToggle = () => {
    this.setState({ addCardToggle: true });
  };

  onAddCardConfirm = () => {
    const newCard = {
      cardContent: this.state.addCardContent,
      listId: this.state.listId,
      cardPosition: this.state.cards.length
    };
    this.props.onAddCard(newCard);
  };

  onAddCardNameChange = event => {
    this.setState({ addCardContent: event.target.value });
  };

  onDeleteList = () => {
    this.props.onDeleteList(this.state.listId);
  };

  render() {
    const { classes } = this.props;
    const { listName, cards } = this.state;

    const cardsMap = cards.map((card, index) => {
      return (
        <li key={index}>
          <AppCard
            className="card-class-name"
            card={card}
            onDeleteCard={this.props.onDeleteCard}
          />
        </li>
      );
    });

    return (
      <Paper className={classes.cardListPaper}>
        <div>
          <Typography component="h3" variant="subtitle1">
            {listName}
          </Typography>
          <MoreHorizIcon />
        </div>
        <ul>{cardsMap}</ul>
        {this.state.addCardToggle ? (
          <div>
            <textarea
              placeholder="Card Content"
              onChange={this.onAddCardNameChange}
            />
            <button onClick={this.onAddCardConfirm}>Add Card</button>
          </div>
        ) : (
          <div>
            <button onClick={this.onAddCardToggle}>Add Card</button>
          </div>
        )}
      </Paper>
    );
  }
}

CardList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardList);
