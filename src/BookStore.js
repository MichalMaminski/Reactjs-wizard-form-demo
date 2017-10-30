// src/BookStore.js

import React from "react";

var BookList = React.createClass({
	getInitialState() {
		return {
			books: [
				{ id: 1, name: "Zero to One", author: "Peter Thiel" },
				{
					id: 2,
					name: "Monk who sold his Ferrari",
					author: "Robin Sharma"
				},
				{ id: 3, name: "Wings of Fire", author: "A.P.J. Abdul Kalam" }
			],
			selectedBooks: [],
			error: false
		};
	},

	_renderBooks(book) {
		return (
			<div className="checkbox" key={book.id}>
				<label>
					<input
						type="checkbox"
						value={book.name}
						onChange={this.handleBookSelection}
					/>{" "}
					{book.name} -- {book.author}
				</label>
			</div>
		);
	},
	_renderError() {
		if (this.state.error) {
			return (
				<div className="alert alert-danger">
					{this.state.error}
				</div>
			);
		}
	},
	render() {
		return (
			<div>
				<h3>
					Choose from wide variety of books avaiable in our store.
				</h3>
				<form onSubmit={this.handleSubmit}>
					{this.state.books.map(book => {
						return this._renderBooks(book);
					})}
					{this._renderError()}
					<input type="submit" className="btn btn-success" />
				</form>
			</div>
		);
	},
	handleBookSelection() {
		var selectedBooks = this.state.selectedBooks;
		var index = selectedBooks.indexOf(event.target.value);

		if (event.target.checked) {
			if (index === -1) selectedBooks.push(event.target.value);
		} else {
			selectedBooks.splice(index, 1);
		}

		this.setState({ selectedBooks: selectedBooks });
	},
	handleSubmit(event) {
		event.preventDefault();

		var selectedBooks = this.state.selectedBooks;

		if (selectedBooks.length === 0) {
			this.setState({ error: 'Please choose at least one book to continue' });
		} else {
			this.setState({ error: false });
			this.props.updateFormData({ selectedBooks: this.state.selectedBooks });
		}
	}
});

var ShippingDetails = React.createClass({
	getInitialState() {
		return {
			fullName: '',
			contactNumber: '',
			shippingAddress: '',
			error: false
		};
	},
	_validateInput() {
		if (this.state.fullName === '') {
			this.setState({ error: "Please enter full name" });
		} else if (this.state.contactNumber === '') {
			this.setState({ error: "Please enter contact number" });
		} else if (this.state.shippingAddress === '') {
			this.setState({ error: "Please enter shipping address" });
		} else {
			this.setState({ error: false });
			return true;
		}
	},
	handleSubmit(event) {
		event.preventDefault();

		var formData = {
			fullName: this.state.fullName,
			contactNumber: this.state.contactNumber,
			shippingAddress: this.state.shippingAddress
		}

		if (this._validateInput()) {
			this.props.updateFormData(formData);
		}
	},
	handleChange(event, attribute) {
		var newState = this.state;
		newState[attribute] = event.target.value;
		this.setState({ newState });
		console.log(newState);
	},
	_renderError() {
		if (this.state.error) {
			return (
				<div className='alert alert-danger'>
					{
						this.state.error
					}
				</div>
			);
		}
	},
	render() {
		return (
			<div>
				<h1> Enter your shipping information.</h1>
				{this._renderError()}
				<div style={{ width: 200 }}>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<input className="form-control"
								type="text"
								placeholder="Full name"
								value={this.state.fullName}
								onChange={(e) => this.handleChange(e, "fullName")}
							/>
						</div>
						<div className="form-group">
							<input className="form-control"
								type="text"
								placeholder="Contact Number"
								value={this.state.contactNumber}
								onChange={(e) => this.handleChange(e, "contactNumber")}
							/>
						</div>
						<div className="form-group">
							<input className="form-control"
								type="text"
								placeholder="Shipping Address"
								value={this.state.shippingAddress}
								onChange={(e) => this.handleChange(e, "shippingAddress")}
							/>
						</div>
						<div className="form-group">
							<button type="submit"
								ref="submit"
								className="btn btn-success">
								Submit
								</button>
						</div>
					</form>
				</div>
			</div>);
	}
});

var DeliveryDetails = React.createClass({
	getInitialState() {
		return {
			deliveryOption: 'Primary'
		}
	},
	handleChange(event) {
		this.setState({ deliveryOption: event.target.value });
	},
	handleSubmit(event) {
		event.preventDefault();
		this.props.updateFormData(this.state);
	},
	render() {
		return (
			<div>
				<h1> Choose your delivery options here.</h1>
				<div style={{ width: 200 }}>
					<form onSubmit={this.handleSubmit}>
						<div className="radio">
							<label>
								<input type="radio"
									checked={this.state.deliveryOption === "Primary"}
									value="Primary"
									onChange={this.handleChange}
								/>
								Primary -- Next day delivery
							</label>
						</div>
						<div className="radio">
							<label>
								<input type="radio"
									checked={this.state.deliveryOption === "Normal"}
									value="Normal"
									onChange={this.handleChange}
								/>
								Normal -- 3-4 days
							</label>
						</div>

						<button type="submit"
							className="btn btn-success">
							Submit
						</button>
					</form>
				</div>
			</div>);
	}
});

var Confirmation = React.createClass({
	handleSubmit(event) {
		event.preventDefault();

		this.props.updateFormData(this.props.data);
	},

	render() {
		return (
			<div>
				<h1>Are you sure you want to submit the data?</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						<strong>Full Name</strong> : {this.props.data.fullName}
					</div>
					<div>
						<strong>Shipping Address</strong> : {this.props.data.shippingAddress}
					</div>
					<div>
						<strong>Delivery Option</strong> : {this.props.data.deliveryOption}
					</div>
					<div>
						<strong>Selected books</strong> : {this.props.data.selectedBooks.join(", ")}
					</div>
					<br />
					<button type="submit"
						className="btn btn-success">
						Place order
					</button>
				</form>
			</div>);
	}
});

var Success = React.createClass({
	render() {
		var numberOfDays = "1 to 2 ";

		if (this.props.data.deliveryOption === "Normal") {
			numberOfDays = "3 to 4 ";
		}

		return (
			<div>
				<h2>
					Thank you for shopping with us {this.props.data.fullName}
				</h2>
				<h4>
					You will soon get {this.props.data.selectedBooks.join(", ")}
					at {this.props.data.shippingAddress} in approximately {numberOfDays} days.
				</h4>
			</div>
		);
	}
});

var BookStore = React.createClass({
	getInitialState() {
		return { currentStep: 1, formData: {} };
	},
	updateFormData(formData) {
		console.log(formData);
		var formValues = Object.assign({}, this.state.formData, formData);
		this.setState({ formData: formValues, currentStep: ++this.state.currentStep });
		console.log(this.state);
	},
	render() {
		switch (this.state.currentStep) {
			case 1:
				return <BookList updateFormData={this.updateFormData} />;
			case 2:
				return <ShippingDetails updateFormData={this.updateFormData} />;
			case 3:
				return <DeliveryDetails updateFormData={this.updateFormData} />;
			case 4:
				return <Confirmation data={this.state.formData} updateFormData={this.updateFormData} />;
			case 5:
				return <Success data={this.state.formData} />;
			default:
				return <BookList updateFormData={this.updateFormData} />;
		}
	}
});

export default BookStore;