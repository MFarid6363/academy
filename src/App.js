import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Courses from './containers/Courses/Courses';
import MainPage from './containers/mainpage/mainpage';

import ParticularCoursePage from './containers/particularCoursePage/particularPage'
// import CourseTeacher from './containers/particularCoursePage/courseteachers/courseteachers'


class App extends Component {
  render () {
    return (
      <div className="App">
          <Switch>
                <Route path='/' exact component={MainPage}/>
                <Route path="/courses" exact component={Courses} />
                {/* <Route path="/React" exact component={ReactCourse} /> */}
                {/* <Route path="/Math" exact component={MathCourse} />
                <Route path="/Electronics" exact component={ElectronicsCourse}/>
                <Route path="/Sport" exact component={SportCourse}/>
                <Route path="/Language" exact component={LanguageCourse}/> */}
                <Route path='/courses/:cour' exact component={ParticularCoursePage}/>
                {/* <Route path='/courses/:cour/teachers' exact component={CourseTeacher}/> */}
          </Switch>
      </div>
    );
  }
}

export default App;
