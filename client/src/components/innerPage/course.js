import React, { Component } from 'react';
import Article from './article';

import api from '../../api';
// import builder from '../../utils/builder';
import dragula from 'dragula';

class FeedTab extends Component{
    ComponentDidMount(){
      this.setState({
        articles: this.props.articles
      })
    }

    postArticle = () =>{
        var text = document.getElementById("textteilen").value;
        api.createArticle(this.props.course.name, "", this.props.user.email, text, Date.now).then(res => {
          window.location.reload(false);
        });
        console.log(this.props.articles)
    }
    render(){
      if(this.props.user.email === this.props.course.teacher.email){
        return(
          <div className="tab-pane fade" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={{ padding: '20px'}}>
            <div className="col-12" id="new_status" style={{marginBottom : '20px'}}>
              <div className="container">
                <div className="row" style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px'}}>
                  <div className="col-4" style={{textAlign: 'center', borderBottom: '1px solid rgb(0, 127, 178)', marginBottom: '-16px'}}>
                    <span className="glyphicon glyphicon-pencil"></span> Text teilen
                  </div>
                  <div className="col-4" style={{textAlign: 'center'}}>
                    Foto Hochladen
                  </div>
                  <div className="col-4" style={{textAlign: 'center'}}>
                    Datei Hochladen
                  </div>
                </div>
              </div>
              <div className="col-12" id="post_content">
                <div className="textarea_wrap">
                  <textarea id='textteilen' className="col-xs-11" style={{width: '100%'}} placeholder="write something..."></textarea>
                </div>
              </div>
              <div className="col-xs-12" id="post_footer">
                <div className="row">
                  <div className="col-12">
                    <button id='teilen' className="btn btn-primary" onClick= {this.postArticle} style={{float: 'right', marginBottom: '10px'}}>Teilen</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='container' id="userposts">
            {this.props.articles.map(function(article) { return( <Article key={article._id} user={this.props.user.email} article={article} />);}, this)}

            </div>
          </div>
        )
    }
    else{
      return(
        <div className="tab-pane fade" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={{ padding: '20px'}}>
            <div className='container' id="userposts">
            {this.props.articles.map(function(article) { return( <Article key={article._id} user={this.props.user.email} article={article} />);}, this)}
            </div>
        </div>
      )
    }
  }
}

class MemberTab extends Component{
    render(){
      if(this.props.members){
        return(
          <div className="tab-pane fade" id="members" role="tabpanel" aria-labelledby="memberstab" style={{backgroundColor: 'white', border: '1px solid #efefef', padding: '20px'}}>
          <ul>
          {this.props.members.map(function(member, i) {
             return <li style={{textTransform: 'capitalize'}} key={i}>{member.firstname} {member.lastname}</li>
          })}
          </ul>
          </div>
        )
      }
      else{
        return null;
      }
    }
}

class LeaveButton extends Component{
    leaveCourse = () =>{
        api.unenrollUser(this.props.user.email, this.props.course.name).then(res => {
          window.location.reload(false);
        });
    }
    render(){
      if (this.props.enrolled === true  && this.props.user.email !== this.props.course.teacher.email){
        return(
          <button id='leavecourse' className='btn' onClick = {this.leaveCourse} style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '8%', borderRadius: '20px', padding: '10px 30px', border: '1px solid #007fb2', color: '#007fb2'}}>Abmelden</button>
        )
      }
      else{
        return null;
      }
    }
}
class JoinButton extends Component{
    joinCourse = () =>{
        api.enrollUser(this.props.user.email, this.props.course.name).then(res => {
            window.location.reload(false);
        });
    }
    render(){
      if (this.props.enrolled === false && this.props.user.email !== this.props.course.teacher.email){
        return(
          <button id='joincourse' className='btn' onClick = {this.joinCourse} style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '8%', borderRadius: '20px', padding: '10px 30px', border: '1px solid #007fb2', color: '#007fb2'}}>mich einschreiben</button>
        )
      }
      else{
        return null;
      }
    }
}
class Course extends Component {

  constructor(props){
    super(props);
    this.state = {
      enrolled: false,
      course: undefined,
      articles: undefined,
      members: []
      };
    }
  componentWillMount(){
  //get course
    var course_name = window.location.pathname.split("/")[2];
    course_name = course_name.replace("%20", " ");

    api.getCourse(course_name)
    .then(course => {
      this.setState({
        course : course
      })
    })
    // check if user is enrolled
    .then(() => api.getAllCoursesOfUser(this.props.user.email).then(res1 => {
      if (res1.some(item => item != null && item.name === course_name)) {
        this.setState({
          enrolled: true,
        })
      }
    }))
    .then(()=>{
        //get all feed articles
          api.getAllArticlesOfCourse(course_name).then(res => {
            this.setState({articles : res.reverse()})
          });
          api.getAllUsersOfCourse(course_name).then(res=>{
              this.setState({members: res.reverse()})
          })
    })
  }

  render() {

    //make sure API calls are finished when rendering (better solution????)
    if(!this.state.course || !this.state.articles){
      return false;
    }
    //user is not an enrolled student neither is user the responsible teacher
    else if(this.state.enrolled === false && this.state.course.teacher.email !== this.props.user.email){
    return (
    <div>
      <div className="container-fluid" style={{marginBottom: '20px',paddingRight: '60px', paddingLeft: '30px'}}>
        <div className="row">
          <div className="col" style={{backgroundColor: 'white', border: '1px solid #e8e9eb', paddingTop: '12px', paddingBottom: '12px'}}>
            <div className="row">
              <div className="col" style={{paddingRight: '0', paddingLeft: '20px'}}>
                 <h1>{this.state.course.name}</h1>
              </div>
              <div className="col-4">
              </div>
                <div className="col" style={{paddingRight: '10px'}}>
                  <JoinButton user={this.props.user} course={this.state.course} enrolled={this.state.enrolled}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="background container-fluid row">
          <div className="col col-sm-12" style={{paddingRight: '0', paddingLeft: '15px'}}>
            <div className="tab-content col-offset-6 centered" style={{marginBottom: '450px'}}>
              <div style={{backgroundColor: 'white', border: '1px solid #efefef', padding: '20px'}}>
                <h3 style={{borderBottom: '1px solid #efefef', paddingBottom: '15px'}}> Inhalt </h3>
                  <p>
                    {this.state.course.description}
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
  else if(this.state.enrolled === true || this.props.user.email === this.state.course.teacher.email){
    const db = localStorage;
    const _ = (el) => {
    	return document.querySelector(el);
    };
    const getTpl = (element) => {
    	return tpl[element];
    };

    const makeEditable = () => {
    	let elements = document.querySelectorAll('.drop-element');
    	let toArr = Array.prototype.slice.call(elements);
    	Array.prototype.forEach.call(toArr, (obj, index) => {
    		if (obj.querySelector('img')) {
    			return false;
    		} else {
    			obj.addEventListener('click', (e) => {
    				e.preventDefault();
    				obj.children[0].setAttribute('contenteditable', '');
    				obj.focus();
    			});
    			obj.children[0].addEventListener('blur', (e) => {
    				e.preventDefault();
    				obj.children[0].removeAttribute('contenteditable');
    			});
    		}
    	});
    };
    const removeDivsToSave = () => {
    	let elements = document.querySelectorAll('.drop-element');
    	let toArr = Array.prototype.slice.call(elements);
    	let html = '';
    	Array.prototype.forEach.call(toArr, (obj, index) => {
        obj.children[0].removeAttribute('contenteditable');
    		html += obj.innerHTML;
    	});
    	return html;
    };

    const tpl = {
    	'header1': '<h1>I am header 1</h1>',
    	'header2': '<h2>I am header 2</h2>',
    	'header3': '<h3>I am header 3</h3>',
    	'shortparagraph': '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et</p>',
    	'mediumparagraph': '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate</p>',
    	'largeparagraph': '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,</p>',
    	'ullist': '<ul><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li></ul>',
    	'ollist': '<ol><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li></ol>',
    	'image': '<img src="http://lorempixel.com/400/200/">',
      'code': '<pre>function say(name){\n return name;\n}</pre>'
    };

    const containers = [_('.box-left'), _('.box-right')];
    const drake = dragula(containers, {
    	copy(el, source) {
    		return source === _('.box-left');
    	},
    	accepts(el, target) {
    		return target !== _('.box-left');
    	}
    });

    drake.on('out', (el, container) => {
    	if (container == _('.box-right')) {
    		el.innerHTML = getTpl(el.getAttribute('data-tpl'));
    		el.className = 'drop-element';
    		makeEditable();
    		db.setItem('savedData', _('.box-right').innerHTML);
    	}
    	if (container == _('.box-left')) {
    		el.innerHTML = el.getAttribute('data-title');
    	}
    });


      return (
        <div>

            <div className="container-fluid" style={{marginBottom: '20px',paddingRight: '54px', paddingLeft: '24px'}}>

                <div className="row">
                    <div className="col" style={{backgroundColor: 'white', border: '1px solid #e8e9eb', paddingTop: '12px', paddingBottom: '12px'}}>
                        <div className="row">
                            <div className="col" style={{paddingRight: '0', paddingLeft: '20px'}}>
                                <h1 style={{textTransform: 'capitalize'}}>{this.state.course.name}</h1>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col" style={{paddingRight: '10px'}}>
                                <LeaveButton user={this.props.user} course={this.state.course} enrolled={this.state.enrolled}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="background-fluid" style={{borderBottom: '1px solid #e8e9eb'}}>
                  <ul className="nav nav-tabs justify-content-center col-offset-6 centered" id="mytabs" role="tablist">
                      <li className = "nav-item">
                          <a className="nav-link tab-title active" id="lehrer-tab" data-toggle="tab" href="#ubersicht" role="tab" aria-controls="ubersicht" aria-selected="true">Übersicht</a>
                      </li>

                      <li className="nav-item">
                          <a className="nav-link tab-title" id="kurse-tab" data-toggle="tab" href="#feed" role="tab" aria-controls="feed" aria-selected="false">Feed</a>
                      </li>

                      <li className="nav-item">
                          <a className="nav-link tab-title" id="members-tab" data-toggle="tab" href="#members" role="tab" aria-controls="memberstab" aria-selected="false">Teilnehmer</a>
                      </li>
                    </ul>
                </div>

            </div>
            <div className="background container-fluid row">
                <div className="col col-sm-12">
                    <div className="tab-content col-offset-6 centered" id="tab-content">

                        <div className="tab-pane fade show active" id="ubersicht" role="tabpanel" aria-labelledby="ubersicht-tab" style={{backgroundColor: 'white', border: '1px solid #efefef', padding: '20px'}}>
                        <div className="row">
                          <div className="col-8">
                            <h3 style={{borderBottom: '1px solid #efefef', paddingBottom: '15px'}}> Inhalt </h3>
                            </div>
                            <div className="col-4">
                            <div className='registrieren_botton' style={{color:'rgb(24, 86, 169)', marginTop: '-67px !important', fontSize: '13px', width: '104px', float: 'right', margin: '-12px 0'}}>
                             bearbeiten
                          	 </div>
                             </div>
                        </div>
                            <p>{this.state.course.description}</p>
                            <div id="kursmaterial">
                            <h3 style={{borderBottom: '1px solid #efefef', paddingBottom: '15px'}}> Kursmaterial </h3>
                            <h3 style={{borderBottom: '1px solid #efefef', paddingBottom: '15px'}}> 16. April - 22. April </h3>
                            <p>Folie 01</p>
                            <p>Folie 02</p>
<div className="wrapper">
	<div className="box-left">
		<div data-tpl="header1" data-title="Header 1">
			Header 1
		</div>
		<div data-tpl="header2" data-title="Header 2">
			Header 2
		</div>
		<div data-tpl="header3" data-title="Header 3">
			Header 3
		</div>
		<div data-tpl="shortparagraph" data-title="Short paragraph">
			Short paragraph
		</div>
		<div data-tpl="mediumparagraph" data-title="Medium paragraph">
			Medium paragraph
		</div>
		<div data-tpl="largeparagraph" data-title="Large paragraph">
			Large paragraph
		</div>
		<div data-tpl="ullist" data-title="Ordened list">
			Ordened list
		</div>
		<div data-tpl="ollist" data-title="Unordened list">
			Unordened list
		</div>
    <div data-tpl="heade12" data-title="Unordened list">
      Datei
    </div>
    <div data-tpl="header12" data-title="Unordened list">
      Picture
    </div>
	</div>
	<div className="box-right"></div>
</div>
                        </div>
                        </div>
                        <MemberTab course={this.state.course} members= {this.state.members}/>
                        <FeedTab  user={this.props.user} course={this.state.course} articles={this.state.articles}/>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  }
}

export default Course;
