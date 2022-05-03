import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    displayDate() {
        let showDate = new Date();
        const hours = (showDate.getHours() + 11) % 12 + 1;
        const minutes = showDate.getMinutes();
        return hours + ' : ' + minutes + ' ' + (hours >= 12 ? "Am" : "PM");
    }

    render() {
        const { user, users } = this.props;

        return (
            <div className="homePage-main">
                <div className='panel-container'>
                    <h1 className='adminPanel'>Admin Panel</h1>
                    <button className='btn btn-primary'>
                        <Link to="/login">Logout</Link>
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Last login</th>
                            <th>Registration</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.items && users.items.map((x, index) =>
                            <tr key={x.id}>
                                <td className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" />
                                </td>
                                <td>{x.id}</td>
                                <td>{x.firstName + ' ' + x.lastName}</td>
                                <td>{x.email}</td>
                                <td>{x.lastLogin}</td>
                                <td>{x.lastLogin}</td>
                                <td>{user.id === x.id ?
                                    <span style={{ color: "green" }}>Active</span>
                                    : <span style={{ color: "red" }}>Not Active</span>}
                                </td>
                                <td>
                                    {x.deleting ? <em> - Deleting...</em>
                                        : x.deleteError ? <span className="text-danger"> - ERROR: {x.deleteError}</span>
                                            : <span> - <a id='deleteUser' onClick={this.handleDeleteUser(x.id)}>Delete User</a></span>}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };