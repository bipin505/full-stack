import React from 'react';
import { Link } from 'react-router-dom';
import { getMeta } from '../../Services/service';
import './Join.css';

export class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            room: ''
        }
    }

    componentDidMount = () => {
        this.getMeta();
    }

    getMeta = async() => {
        try {
            console.log(await getMeta())
        } catch (error) {
            throw error;
        }
    }

    handleChange = async (event) => {
        try {
            await this.setState({
                [event.target.name]: event.target.value
            })
        } catch (error) {
            throw error;
        }
    }
    render() {
        return (  
            <div className='joinOuterConatiner'>
                <div className='joinInnerConatiner'>
                <h1 className='heading'>Join Chat</h1>
                <div><input type="text" name="name" className="login" placeholder="Enter Name" onChange={this.handleChange}/></div>
                <div><input type="text" name="room" className="login" placeholder="Enter Room" onChange={this.handleChange}/></div>
                <Link onClick={event =>(!this.state.name || !this.state.room ? event.preventDefault() :null) } to={`/chat?name=${this.state.name}&room=${this.state.room}`}>
                <button className="button" type="submit">Sign In</button>
                </Link>
        
                </div>
            </div>
            
            
                );
    }
}
