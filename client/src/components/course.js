import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from'../img/esna.png';
import Bell from'../img/bell-icon.png';
import Chat from'../img/chat-icon.png';
import '../css/timeline.css';

import cookie from 'react-cookies';
import { checkUserSession, updateTimeSec } from '../utils/userSessionHelper';


class Course extends Component {




  // logout() {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const obj = getFromStorage('the_main_app');
  //   if (obj && obj.token) {
  //     const { token } = obj;
  //     // Verify token
  //     fetch('/api/account/logout?token=' + token)
  //       .then(res => res.json())
  //       .then(json => {
  //         if (json.success) {
  //           this.setState({
  //             token: '',
  //             isLoading: false
  //           });
  //         } else {
  //           this.setState({
  //             isLoading: false,
  //           });
  //         }
  //       });
  //   } else {
  //     this.setState({
  //       isLoading: false,
  //     });
  //   }
  // }

  render() {

    //Checks if there is an active UserSession
    fetch('/userSession/check', {

    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( { token: cookie.load('userID') } )
    }).then (res => {

      if(res.status == 500){


        this.props.history.push("/");
      }else{
        cookie.save('userID', cookie.load('userID'), {expires: updateTimeSec(60000), path: '/'})

      }
    });

    return (
      <div style={{backgroundColor: '#f7f8fa'}}>
      <nav className="navbar navbar-expand-sm" style={{backgroundColor: 'white'}}>
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/"><img id="logo" className="logo" src={Logo} alt="Logo"/></a>
          </div>

          <form className="navbar-form navbar-center" action="/search">
            <div className="input-group">
              <div className="input-group-btn">
                <button className="searchbutton btn" type="submit"></button>
              </div>
              <input type="text" className="searchbar form-control" placeholder="Search" name="srch-term" id="srch-term"/>
            </div>
          </form>

          <ul className="nav navbar-nav navbar-right">
            <li><a href="#"><img id="chat" className="icon" src={Chat} alt="Chat"/></a></li>
            <li><a href="#"><img id="notifications" className="icon" src={Bell} alt="Bell"/></a></li>
          </ul>

        </div>
      </nav>

      <div className="background-fluid" style={{backgroundColor: '#f7f8fa', border: '1px solid #e8e9eb', paddingTop:'10px'}}>
        <ul className="nav nav-tabs justify-content-center col-offset-6 centered" id="mytabs" role="tablist">
            <li className = "nav-item">
                <a className="nav-link active" id="lehrer-tab" data-toggle="tab" href="#ubersicht" role="tab" aria-controls="ubersicht" aria-selected="true">Übersicht</a>
            </li>

            <li className="nav-item">
                <a className="nav-link" id="kurse-tab" data-toggle="tab" href="#feed" role="tab" aria-controls="feed" aria-selected="false">Feed</a>
            </li>

          </ul>
      </div>


      <div className="container-fluid" style={{marginTop: '20px', marginBottom: '20px',paddingRight: '60px', paddingLeft: '30px'}}>
        <div className="row">

          <div className="col" style={{backgroundColor: 'white', border: '1px solid #e8e9eb', paddingTop: '12px', paddingBottom: '12px'}}>
            <div className="row" style={{backgroundColor: 'white'}}>
                  <div className="col" style={{backgroundColor: 'white', paddingRight: '0', paddingLeft: '20px'}}>
                  <h1>Spanish A1</h1>
                  </div>
                  <div className="col-4" style={{backgroundColor: 'white'}}>
                  </div>
                  <div className="col" style={{backgroundColor: 'white', paddingRight: '10px'}}>
                    <button style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '8%', borderRadius: '20px', padding: '10px 30px', border: '1px solid #007fb2', color: '#007fb2'}}>Eingeschrieben</button>
                  </div>
            </div>
          </div>

        </div>
      </div>



      <div className="background container-fluid row">

        <div className="col col-sm-3">
          <div className="row">
            <div className="box col-sm-12 text-center">
            <strong>SKB User</strong>
            </div>
          </div>

          <div className="row" style={{marginBottom:'10px'}}>
            <div className="box col-md-6 text-center">
              <strong>2</strong><br /><small className="text-muted">Kurse</small>
            </div>
            <div className="box col-md-6 text-center">
              <strong>5</strong><br /><small className="text-muted">Gruppen</small>
            </div>
          </div>

          <div className="row box" style={{backgroundColor:'white'}}>
            <div className=" col-sm-12 text-center" style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingBottom:'15px'}}>
            <strong>Einstellungen</strong>
            </div>
            <p style={{paddingTop:'15px'}}>kurs verlassen</p>
          </div>

        </div>

        <div className="col col-sm-6" style={{paddingRight: '0', paddingLeft: '0'}}>




          <div className="tab-content col-offset-6 centered" id="tab-content">

              <div className="tab-pane fade show active" id="ubersicht" role="tabpanel" aria-labelledby="ubersicht-tab"
              style={{backgroundColor: 'white', border: '1px solid #efefef', padding: '20px'}}>
                  <h3 style={{borderBottom: '1px solid #efefef', paddingBottom: '15px'}}> Inhalt </h3>

                  <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                  </p>

                  <h3 style={{borderBottom: '1px solid #efefef', paddingBottom: '15px'}}> 16. April - 22. April </h3>

                  <p>Folie 01</p>
                  <p>Folie 02</p>

              </div>

              <div className="tab-pane fade" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={{ padding: '20px'}}>

              <div className="col-12" id="new_status" style={{marginBottom : '20px'}}>

<div className="container">
                <div className="row" style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px'}}>
                    <div className="col-4" style={{textAlign: 'center', borderBottom: '1px solid rgb(0, 127, 178)', marginBottom: '-16px'}}>
                    <span class="glyphicon glyphicon-pencil"></span>
                      Text teilen
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
                <div className="textarea_wrap"><textarea className="col-xs-11" placeholder="write something..."></textarea></div>
                </div>

                <div className="col-xs-12" id="post_footer">
                  <div className="row">
                    <div className="col-12">
                      <button className="btn btn-primary" style={{float: 'right', marginBottom:'10px'}}>Teilen</button>
                    </div>
                    </div>
                </div>
</div>

              <div className='container' id="userposts">
                <div className='row' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px', marginBottom:'20px'}}>
                      <div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
                          <div className='row'>
                            <div className='col-6'>
                              Mariano Brey
                            </div>
                            <div className='col-6'>
                              <p style={{float:'right'}}>10 min</p>
                            </div>
                          </div>
                      </div>
                      <div className='col-12'>
                          <p style={{color: '#a9a8a8'}}>Lorem ipsum dolor sit amet, euismod facilisis vis cu. Pro eu eros incorrupte,
                          mnesarchum argumentum his et. Ne alia solum similique sit, nec an soleat
                          omnium, ad labore eruditi eum. Ius ei aliquid laoreet, ne duo accusamus
                          splendide moderatius, eos ei movet semper elaboraret.</p>
                      </div>
                </div>

                <div className='row' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px'}}>
                      <div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
                          <div className='row'>
                            <div className='col-6'>
                              Anton Gulenko
                            </div>
                            <div className='col-6'>
                              <p style={{float:'right'}}>35 min</p>
                            </div>
                          </div>
                      </div>
                      <div className='col-12'>
                          <p style={{color: '#a9a8a8'}}>Lorem ipsum dolor sit amet, euismod facilisis vis cu. Pro eu eros incorrupte,
                          mnesarchum argumentum his et. Ne alia solum similique sit, nec an soleat
                          omnium, ad labore eruditi eum. Ius ei aliquid laoreet, ne duo accusamus
                          splendide moderatius, eos ei movet semper elaboraret.</p>
                      </div>
                </div>
              </div>




              </div>
            </div>
        </div>

        <div className="col col-sm-3">
            <div className="row">
            <div className="box col-sm-12">
              <h6>Kurs Leitern Kontaktieren</h6>


            </div>
          </div>
        </div>

      </div>

      </div>
    );
  }
}

export default Course;