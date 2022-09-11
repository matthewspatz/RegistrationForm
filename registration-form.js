class RegistrationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          firstName: '',
          lastName: '',
          npiNumber: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          phoneNumber: '',
          email: ''
        };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.resetState = this.resetState.bind(this);
      this.validateForm = this.validateForm.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }
    
    resetState() {
        this.setState({
            firstName: '',
            lastName: '',
            npiNumber: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            phoneNumber: '',
            email: ''
          });
    }

    validateForm() {
        // I didnt add special checks for fields aside from npi number because things like
        // phone number and zipcode format depend on what your system expects and for valid email
        // I made use of the html attribute since there are many factors that go into trying to actually
        // validate an email and the attribute is more forgiving than most regex patterns.
        // If special checks were needed, they could be added in the same fashion as the npi number 
        // example with the appropriate regex however.
        let fnError = false;
        let lnError = false;
        let npiError = false;
        let strError = false;
        let ctyError = false;
        let staError = false;
        let zipError = false;
        let phnError = false;
        let emailError = false;

        if (!this.state.firstName)
            fnError = true;
        if (!this.state.lastName)
            lnError = true;
        
        if (!this.state.npiNumber) {
            npiError = true;
        } else {
            if (this.state.npiNumber.replace(/[0-9]{10}/,'')) {
                npiError = true;
            }
        }
        
        if (!this.state.street)
            strError = true;
        if (!this.state.city)
            ctyError = true;
        if (!this.state.state)
            staError = true;
        if (!this.state.zip)
            zipError = true;
        if (!this.state.phoneNumber)
            phnError = true;
        if (!this.state.email)
            emailError = true;
        
        this.setState({ 
            firstNameError: fnError,
            lastNameError: lnError,
            npiNumberError: npiError,
            streetError: strError,
            cityError: ctyError,
            stateError: staError,
            zipError: zipError,
            phoneNumberError: phnError,
            emailError: emailError
        });

        if (fnError || lnError || npiError || strError || ctyError || staError || zipError || phnError || emailError)
            return false;
        return true;
    }

    handleSubmit(e) {
        const isValid = this.validateForm();
        if (!isValid) {
            e.preventDefault();
            return;
        }

        const formData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            npiNumber: this.state.npiNumber,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email
        };
        // just logging the form data but it could be passed from here to whatever backend
        // is being used
        console.log(formData);
        alert("Thank you for registering!");
        this.resetState();
        e.preventDefault();
    }

    render() {
      return (
        <div className="container">
            <form onSubmit={this.handleSubmit}>
                {this.state.firstNameError && <div className="error-text">Enter a first name</div>}
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" type="text" className={this.state.firstNameError ? "error" : ""} placeholder="First Name" value={this.state.firstName} onChange={this.handleInputChange} />
                
                {this.state.lastNameError && <div className="error-text">Enter a last name</div>}                
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" type="text" className={this.state.lastNameError ? "error" : ""} placeholder="Last Name" value={this.state.lastName} onChange={this.handleInputChange} />
                
                {this.state.npiNumberError && <div className="error-text">Enter a valid NPI number (10 digits)</div>}
                <label htmlFor="npiNumber">NPI Number</label>
                <input name="npiNumber" type="text" className={this.state.npiNumberError ? "error" : ""}  placeholder="NPI Number" value={this.state.npiNumber} onChange={this.handleInputChange} />
                
                <label htmlFor="street">Business Address</label>
                {this.state.streetError && <div className="error-text">Enter a street address</div>}
                <input name="street" type="text" className={this.state.streetError ? "error" : ""} placeholder="Street" value={this.state.street} onChange={this.handleInputChange} />
                {this.state.cityError && <div className="error-text">Enter a city</div>}
                <input name="city" type="text" className={this.state.cityError ? "error" : ""} placeholder="City" value={this.state.city} onChange={this.handleInputChange} />
                {this.state.stateError && <div className="error-text">Enter a state</div>}
                <input name="state" type="text" className={this.state.stateError ? "error" : ""} placeholder="State" value={this.state.state} onChange={this.handleInputChange} />
                {this.state.zipError && <div className="error-text">Enter a zip code</div>}
                <input name="zip" type="text" className={this.state.zipError ? "error" : ""} placeholder="Zip Code" value={this.state.zip} onChange={this.handleInputChange} />
                
                {this.state.phoneNumberError && <div className="error-text">Enter a phone number</div>}
                <label htmlFor="phoneNumber">Phone Number</label>
                <input name="phoneNumber" type="text" className={this.state.phoneNumberError ? "error" : ""} placeholder="Phone Number" value={this.state.phoneNumber} onChange={this.handleInputChange} />
                
                {this.state.emailError && <div className="error-text">Enter a valid email address</div>}
                <label htmlFor="email">Email Address</label>
                <input name="email" type="email" className={this.state.emailError ? "error" : ""} placeholder="Email Address" value={this.state.email} onChange={this.handleInputChange} />
                
                <input type="submit" value="Submit" />
            </form>
        </div>
      );
    }
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<RegistrationForm />);