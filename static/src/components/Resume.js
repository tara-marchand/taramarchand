import './Resume.css';
import resumeJson from './resume.json';

import React from 'react';
// using an ES6 transpiler, like babel
import { Router, Route, Link, IndexLink } from 'react-router'

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resume: resumeJson
    }
  }

  render() {
    return (
      <div id="resume">
        <h1>{this.state.resume.basics.name}</h1>
        <section id="basics">
          <div className="contact">
            <span className="email">
              <a href="mailto:tara@mac.com">{this.state.resume.basics.email}</a>
            </span>
            <span className="website">
              <span className="dot">·</span> <a href="{this.state.resume.basics.website}">{this.state.resume.basics.website}</a>
            </span>
          </div>
          <section id="profiles">
            {this.state.resume.basics.profiles.map((profile, index) =>
              <span className="item" key={index}>
                <a href="{profile.url}" className="network">{profile.network}</a>
              </span>
            )}
            </section>
        </section>
        <hr />
        <section id="skills">
          <h2>Skills</h2>
          {this.state.resume.skills.map((skill, index) =>
            <ul className="item" key={index}>
              <li>
                <ul className="keywords">
                  <strong>{skill.name}:</strong> 
                  {skill.keywords.map((keyword, index2) =>
                    <li key={index2}>{keyword}</li>
                  )}
                </ul>
              </li>
            </ul>
          )}
        </section>
        <hr />
        <section id="work">
          <h2>Experience</h2>
          {this.state.resume.work.map((workplace, index) =>
            <div className="item" key={index}>
              <h3 className="position">
                {workplace.position}
              </h3>
              <div className="name-date">
                <a href="{workplace.website}">{workplace.company}</a>
                ·
                <span className="startDate">
                  {workplace.startDate}
                </span>
                <span className="endDate">
                  {workplace.endDate}
                </span>
              </div>
              <ul className="highlights">
                {workplace.highlights.map((highlight, index2) =>
                  <li key={index2} dangerouslySetInnerHTML={{ __html: highlight }} />
                )}
              </ul>
            </div>
          )}
        </section>
        <hr />
        <section id="education">
          <h2>Education</h2>
          <ul className="education">
            {this.state.resume.education.map((ed, index) =>
              <li className="item" key={index}>
                {ed.institution} · {ed.studyType}, {ed.area}
              </li>
            )}
          </ul></section>
      </div>
    );
  }
}

export default Resume;
