import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';


export default class CreateList extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTask = this.onChangeTask.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            task: "",
            date: new Date(),
            users: []
        }
    }

    onChangeUsername(e){
        this.setState({ 
            username: e.target.value
        })
    }

    onChangeTask(e){
        this.setState({
            task: e.target.value
        })
    }

    onChangeDate(date){
        this.setState({
            date: date
        })
    }

    onSubmit(e){
        e.preventDefault();

        const List = {
            username: this.state.username,
            task: this.state.task,
            date: this.state.date
        }

        console.log(List);

        axios.post("http://localhost:4000/lists/add", List)
            .then(res => console.log(res.data));
    }

    componentDidMount() {
        axios.get("http://localhost:4000/users/")
            .then(Response => {
                if(Response.data.length > 0){
                    this.setState({
                        users: Response.data.map(user => user.username),
                        username: Response.data[0].username
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return(
            <div>
                <h1>Create new list of To Do</h1>
    
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User Name:</label>
    
                        <select useref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user){
                                    return <option
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
    
                    <div className="form-group">
                        <label>Task: </label>
    
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.task}
                        onChange={this.onChangeTask} />
                    </div>
    
                    <div className="form-group">
                        <label>Date: </label>
    
                        <div>
                            <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate} />
                        </div>
                    </div>
    
                    <div className="form-group">
                        <input type="submit" value="Create List" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
