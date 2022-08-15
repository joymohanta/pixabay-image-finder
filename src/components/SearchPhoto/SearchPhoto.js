import React, { Component } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import ImageResult from "../ImageResult/ImageResult";

class SearchPhoto extends Component {
  state = {
    searchText: "",
    amount: 30,
    apiUrl: "https://pixabay.com/api",
    apiKey: "29163420-480b4517f6957dfc570a8d2b2",
    images: [],
  };

  onTextChange = (e) => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then((res) => this.setState({ images: res.data.hits }))
          .catch((err) => console.log(err));
      }
    });
  };

  onAmountChange = (e, index, value) => this.setState({ amount: value });

  render() {
    console.log(this.state.images);
    return (
      <div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "400px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            name="searchText"
            value={this.state.searchText}
            onChange={this.onTextChange}
          />
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Show Result</InputLabel>
          <Select
            name="amount"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.amount}
            onChange={this.onAmountChange}
          >
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Box>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResult images={this.state.images}></ImageResult>
        ) : null}
      </div>
    );
  }
}
export default SearchPhoto;
