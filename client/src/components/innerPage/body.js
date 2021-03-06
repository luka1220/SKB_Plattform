import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'

import { AllCourses, MyCourses, MyTeacherCourses } from './allCourses';
import Newsfeed from './newsfeed';
import Course from './course';
import CreateCourse from './createcourse';
import CreateChannel from './createchannel';
import Groups from './groups';
import Channels from './channels';
import Profile from './profile';
import Profileedit from './profileedit';
import ChangePassword from './changePassword';
import Settings from './settings';
import SmallProfile from './smallProfile';
import MessageList from './messageList';
import { Messages } from './messages';
import TeacherInfo from './teacherInfo';
import InviteToCourse from './inviteToCourse';
import Group from './group';
import Channel from './channel';
import AllUsers from './allUsers';

import '../../css/course.css';


 //kann man hier nach wunsch anspaaen wie der active Link aussehen soll
    const activeObj = {
      //fontWeight: 'bold',
      color: "white",
      backgroundColor: '#C0D9D9'
    }

function GroupNavBar(props){	
	if(!props.user.isTeacher || props.user.isAdmin){
		return(
			<NavLink className="nav-item nav-link" activeStyle={ activeObj } to='/groups'>
				  Gruppen
			</NavLink>
		);
	}
	return(null);
}

function ChannelNavBar(props){
	if(props.user.isTeacher || props.user.isAdmin){
		return(
			<NavLink className="nav-item nav-link" activeStyle={ activeObj } to='/channels'>
				  Channels
			</NavLink>
		);
	}
	return(null);
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {
   
    return (
      <div>
        { /*Navigation activeClassName='active'*/ }
        <div className="background-fluid row">
          <nav className="offset-md-3 col-md-6 nav nav-fill justify-content-center">
            <NavLink className="nav-item nav-link" exact={ true } activeStyle={ activeObj } to='/'>
              Newsfeed
            </NavLink>
            <NavLink className="nav-item nav-link" activeStyle={ activeObj } to='/courses'>
              Kurse
            </NavLink>
            <ChannelNavBar user={this.props.user}/>
			       <GroupNavBar user={this.props.user}/>
          </nav>
        </div>
        <div className="container-fluid">
          <div className="cols row" style={ { height: '100%' } }>
            { /* Left Container*/ }
            <div className="d-none d-md-block col-md-3" style={ { zIndex: '1' } }>
              <SmallProfile user={ this.props.user } />
              <div style={ { paddingTop: '20px' } }></div>
              <MyTeacherCourses user={ this.props.user } mini={ true } />
              <MyCourses myEmail={ this.props.user.email } mini={ true } />
            </div>
            { /* Right Container*/ }
            
            { /* MainWindow */ }
              <Switch>
                <Route exact path='/courses/:name' render={ (props) => (
                  <div className="col-md-9" style={ { paddingRight: '0', paddingLeft: '0' } }>
                          <Course user={ this.props.user } location={props.location}/>
                  </div>
                ) } />
                  <Route exact path='/' render={ (props) => (
                    <div className="col-md-6" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <Newsfeed user={ this.props.user } />
                    </div>
                  ) } />
                  <Route exact path='/courses' render={ (props) => (
                    <div className="col-md-6" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <AllCourses user={ this.props.user } />
                    </div>
                  ) } />
                  <Route exact path='/createcourse' render={ (props) => (
                    <div className="col-md-6" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <CreateCourse user={ this.props.user } history={ props.history } />
                    </div>
                  ) } />
				  <Route exact path='/createchannel' render={ (props) => (
                    <div className="col-md-6" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <CreateChannel user={ this.props.user } history={ props.history } />
                    </div>
                  ) } />
                  <Route exact path='/groups' render={ (props) => (
                    <div className="col-md-6" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <Groups user={ this.props.user }  location={ props.location } />
                    </div>
                  ) } />
                  <Route exact path='/group/:groupId' render={ (props) => (
                    <div className="col-md-9" style={ { paddingRight: '0', paddingLeft: '0' } }>
                         <Group user={ this.props.user } location={ props.location } />
                    </div>
                       ) } />
					 <Route exact path='/channels' render={ (props) => (
                    <div className="col-md-6" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <Channels user={ this.props.user }  location={ props.location } />
                    </div>
                  ) } />
				   <Route exact path='/channel/:channelId' render={ (props) => (
                    <div className="col-md-9" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <Channel user={ this.props.user }  location={ props.location } />
                    </div>
                  ) } />
                  <Route exact path='/user/:email' render={ (props) => (
                    <div className="col-md-6" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <Profile user={ this.props.user } location={ props.location } />
                    </div>
                  ) } />
                  <Route exact path='/user/:email/edit' render={ (props) => (
                    <div className="col-md-6" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <Profileedit user={ this.props.user } location={ props.location } updateUser={ this.props.updateUser } history={ props.history } />
                    </div>
                  ) } />
                  <Route exact path='/settings' render={ (props) => (
                    <div className="col-md-6" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <Settings user={ this.props.user } />
                    </div>
                  ) } />
                  <Route exact path='/user/:email/changePassword' render={ (props) => (
                    <div className="col-md-6" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <ChangePassword user={ this.props.user } history={ props.history } />
                    </div>
                  ) } />
                  <Route exact path='/messages' render={ (props) => (
                    <div className="col-md-6" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <MessageList user={ this.props.user } />
                    </div>
                  ) } />
                  <Route path='/messages/:email' render={ (props) => (
                    <div className="col-md-6" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <Messages user={ this.props.user } />
                    </div>
                  ) } />
                  <Route path='/allUsers' render={ (props) => (
                    <div className="col-md-6" style={ { paddingRight: '0', paddingLeft: '0' } }>
                            <AllUsers user={ this.props.user } />
                    </div>
                  ) } />
              </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
