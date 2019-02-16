import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const initialState = {
  boardName: ""
};

class CreateBoardDialog extends React.Component {
  state = initialState;

  onBoardNameChange = event => {
    this.setState({ boardName: event.target.value });
  };

  onCreateBoard = () => {
    this.props.onCreateBoard(this.state.boardName);
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Board Title"
            type="email"
            fullWidth
            onChange={this.onBoardNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onCreateBoard} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CreateBoardDialog;
