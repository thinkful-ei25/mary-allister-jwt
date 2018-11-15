import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import { refreshAuthToken, clearAuth } from '../actions/auth';

export class App extends React.Component {


    stopLogoutTimer() {
        if (!this.logoutTimer) {
            return;
        }

        clearTimeout(this.logoutTimer);
    }


    logOut() {
        this.props.dispatch(clearAuth());
        this.stopLogoutTimer();
    }

    componentDidMount() {
        this.confirmTimer = setTimeout(()=>{
            this.windowConfirm(window.confirm('Press OK to Stay Logged In'))
        }, 10000)
        // this.logoutTimer = setTimeout(() => {
        //     this.logOut()
        // }, 20000)
        console.log(this.logoutTimer)
        //
    }

    resetTimer() {
        console.log('resetTimer was called')
        // this.confirmTimer = setTimeout(() => {
        //     this.windowConfirm(window.confirm('Press OK to Stay Logged In'))
        // }, 10000)
        clearTimeout(this.logoutTimer);
        this.logoutTimer = setTimeout(() => {
            this.logOut()
        }, 20000)

    }

    windowConfirm(ok) {
        if (ok) {
            console.log('window confirm was clicked')
            this.resetTimer();
        } else {
            this.logOut();
        }
    }

    //////////////////////////////////////////////

    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();

    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            10 * 60 * 1000  // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <div className="app"
            //  onClick={() => {
            //     console.log('event listener was triggered')
            //     this.resetTimer()
            // }
            // }
            >
                <HeaderBar />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/register" component={RegistrationPage} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
