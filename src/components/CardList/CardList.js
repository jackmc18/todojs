import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AppCard from "../AppCard/AppCard";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";

const styles = theme => ({
  cardListPaper: {
    width: 275,
    padding: 5
  },
  cardListHeader: {
    display: "flex",
    justifyContent: "space-between"
  },
  moreIconButton: {
    height: 10,
    width: 10
  },
  moreIcon: {
    position: "fixed"
  },
  moreMenu: {
    zIndex: 1
  },
  cardList: {
    listStyle: "none",
    padding: 0
  },
  newCardContent: {
    width: "100%"
  }
});

const initialState = {
  listName: "",
  listId: null,
  cards: [],
  openMoreMenu: false,
  openMoreAnchor: null,
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

  handleClickAway = () => {
    this.setState({ addCardToggle: false });
  };

  onAddCardConfirm = () => {
    // Check if the content is only white space
    if (/\S/.test(this.state.addCardContent)) {
      const newCard = {
        cardContent: this.state.addCardContent,
        listId: this.state.listId,
        cardPosition: this.state.cards.length
      };
      this.props.onAddCard(newCard);
    }
  };

  onAddCardNameChange = event => {
    this.setState({ addCardContent: event.target.value });
  };

  handleClickMore = event => {
    this.setState({ openMoreMenu: true, openMoreAnchor: event.currentTarget });
  };

  handleCloseMore = event => {
    this.setState({ openMoreMenu: false, openMoreAnchor: null });
  };

  onDeleteList = () => {
    this.props.onDeleteList(this.state.listId);
  };

  render() {
    const { classes } = this.props;
    const { listName, cards, openMoreMenu, openMoreAnchor } = this.state;

    const cardsMap = cards.map((card, index) => {
      return (
        <li key={index}>
          <AppCard
            className="card-class-name"
            card={card}
            onDeleteCard={this.props.onDeleteCard}
            onEditCardContent={this.props.onEditCardContent}
          />
        </li>
      );
    });

    return (
      <Paper className={classes.cardListPaper}>
        <div className={classes.cardListHeader}>
          <Typography component="h3" variant="subtitle1">
            {listName}
          </Typography>
          <IconButton
            className={classes.moreIconButton}
            aria-owns={openMoreMenu ? "more-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleClickMore}
          >
            <MoreHorizIcon className={classes.moreIcon} />
          </IconButton>
          <Popover
            id="more-menu"
            open={openMoreMenu}
            anchorEl={openMoreAnchor}
            onClose={this.handleCloseMore}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <Button onClick={this.onDeleteList}>
              <Typography>Delete</Typography>
            </Button>
          </Popover>
        </div>
        <ul className={classes.cardList}>{cardsMap}</ul>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          {this.state.addCardToggle ? (
            <div>
              <TextField
                className={classes.newCardContent}
                label="Card Content"
                multiline
                variant="filled"
                placeholder="Card Content"
                onChange={this.onAddCardNameChange}
              />
              <Button onClick={this.onAddCardConfirm}>Add Card</Button>
            </div>
          ) : (
            <div>
              <Button onClick={this.onAddCardToggle}>Add Card</Button>
            </div>
          )}
        </ClickAwayListener>
      </Paper>
    );
  }
}

CardList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardList);
