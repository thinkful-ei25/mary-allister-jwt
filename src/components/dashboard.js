import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';
// import {clearAuth } from '../actions/auth';



export class Dashboard extends React.Component {


    // stopLogoutTimer() {
    //     if (!this.logoutTimer) {
    //         return;
    //     }

    //     clearTimeout(this.logoutTimer);
    // }


    // logOut() {
    //     this.props.dispatch(clearAuth());
    //     this.stopLogoutTimer();
    //     // clearAuthToken();


    componentDidMount() {
        this.props.dispatch(fetchProtectedData());

    }

    // resetTimer() {
    //     clearTimeout(this.logoutTimer);
    //     this.logoutTimer = setTimeout(() => {
    //         this.logOut()
    //     }, 10000)

    // }

    //     windowConfirm(ok) {
    //         if (ok) {
    //             this.resetTimer();
    //         } else {
    //             this.logOut();
    //         }
    // }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
