import React, {Component} from 'react';
import axios from 'axios';


export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
        };
    }
    

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);

        axios.post("http://localhost:4000/users/add", user)
            .then(res => console.log(res.data))
            .catch(err => console.log("Error: " + err))
        
        this.setState({
            username: ""
        })
    }

    render() {
        return(
            <div>
                <h3>Create User</h3>

                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>User name: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername} />
                    </div>

                    <div>
                        <input type="submit" value="Create user" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}