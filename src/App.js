import "./App.css";
import React, { Component } from "react";
import Logo from "./reddit.svg";
import { CardList } from "./CardList.js";

class RedditSearch extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.onChange = this.onChange.bind(this);

		this.state = {
			searchedTerm: "",
			sortBy: "relevance",
			select: "5",
			redditData: [],
		};
	}

	async componentDidUpdate(prevProps, prevState) {
		if (prevState.searchedTerm !== this.state.searchedTerm) {
			const url = `http://www.reddit.com/search.json?q=${this.state.searchedTerm}&sort=${this.state.sortBy}&limit=${this.state.select}`;
			const response = await fetch(url);
			const data = await response.json();
			this.setState({
				redditData: data.data.children.map((data) => data.data),
			});
		}
	}

	handleSearch(e) {
		e.preventDefault();
		const searchedTerm = e.target.elements.search.value.trim();
		e.target.elements.search.value = "";
		this.setState({ searchedTerm });
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const redditData = this.state.redditData;
		const { sortBy } = this.state;
		return (
			<div className="App">
				<nav className="App-header">findit</nav>
				<div className="app-subHeader">
					<img src={Logo} className="App-logo" alt="logo" />
					<h1> Search App</h1>
				</div>
				<br />
				<br />
				<form onSubmit={this.handleSearch}>
					<input type="text" name="search" placeholder="search input" />
					<label>
						<input
							type="radio"
							name="sortBy"
							value="relevance"
							checked={sortBy === "relevance"}
							onChange={this.onChange}
						/>
						relevance
					</label>
					<label>
						<input
							type="radio"
							name="sortBy"
							value="new"
							checked={sortBy === "new"}
							onChange={this.onChange}
						/>
						new
					</label>
					<br />
					<br />
					<label>
						the amount of post you want to see
						<select
							name="select"
							value={this.state.value}
							onChange={this.onChange}
						>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="40">40</option>
						</select>
					</label>
					<br />
					<br />

					<input type="submit" value="submit"></input>
				</form>

				<CardList redditData={redditData} />
				{console.log(redditData)}
			</div>
		);
	}
}

export default RedditSearch;
