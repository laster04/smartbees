import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {PrivateRoute} from '../_components';
import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';
import {TemperaturePage} from "../TemperaturePage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user'))
        });
    }

    render() {
        const { user }= this.state;
        return (
            <Router>
                <div className="wrapper">
                    <nav id="sidebar">
                        <div className="sidebar-header">
                            <h3>Smart-bees</h3>
                        </div>
                        <ul className="list-unstyled components">
                            <li>
                                <Link to="/login">Odhlásit</Link>
                            </li>
                            <li>
                                <Link to="/temperature">Teplota</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="content">
                        <div>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage}/>
                            <PrivateRoute path="/temperature" component={TemperaturePage}/>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export {App};