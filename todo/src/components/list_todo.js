import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const List = props => (
    <tr>
        <td>
            {props.List.username}
        </td>
        <td>
            {props.List.task}
        </td>
        <td>
            {props.List.date.substring(0,10)}
        </td>
        <td>
            <Link to={"/edit/"+props.List._id}>Edit</Link> | <a href="#" onClick={() => {props.deleteList(props.List._id)}}>Delete</a>
        </td>
    </tr>
)

export default class TodoList extends Component {
    constructor(props){
        super(props);

        this.deleteList = this.deleteList.bind(this);
        this.state = {List: []};
    }

    componentDidMount(){
        axios.get("http://localhost:4000/lists/")
            .then(res => {
                this.setState({List: res.data})
            })
            .catch((err) => {
                console.log("Error" + err);
            })
    }

    deleteList(id) {
        axios.delete("http://localhost:4000/lists/" + id)
            .then(res => {console.log(res.data)});

        this.setState({
            List: this.state.List.filter(el => el._id !== id)
        })
    }

    List() {
        return this.state.List.map(currentList => {
            return <List List={currentList} deleteList={this.deleteList} key={currentList._id} />
        })
    }

    render() {
        return(
            <div>
                <h1>To Do</h1>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>User Name: </th>
                            <th>Task: </th>
                            <th>Date: </th>
                            <th>Actions: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.List()}
                    </tbody>
                </table>
            </div>
        )
    }
    
}