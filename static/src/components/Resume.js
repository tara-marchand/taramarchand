import React, { PureComponent } from 'react';
import { List } from 'semantic-ui-react';

import resumeJson from './resume.json';

class Resume extends PureComponent {
  render() {
    const { name } = resumeJson.basics;

    return (
      <div id="resume">
        <h1>{name}</h1>
        {this.renderBasics()}
        <hr />
        {this.renderSkills()}
        <hr />
        {this.renderWork()}
        <hr />
        {this.renderEducation()}
      </div>
    );
  }

  renderBasics() {
    const { basics } = resumeJson;

    return (
      <section id="basics">
        <div>
          <span>
            <a href="mailto:tara@mac.com">{basics.email} </a>
          </span>
          <span>
            <span>·</span> <a href="{basics.website}">{basics.website}</a>
          </span>
        </div>
        <section id="profiles">
          {basics.profiles.map((profile, index) => (
            <span key={index}>
              <a href="{profile.url}">{profile.network} </a>
            </span>
          ))}
        </section>
      </section>
    );
  }

  renderSkills() {
    const { skills } = resumeJson;

    return (
      <section id="skills">
        <h2>Skills</h2>
        {skills.map((skill, index) => (
          <div key={index}>
            <div>
              <strong>{skill.name}: </strong>
              {skill.keywords.map((keyword, index) => {
                let value =
                  index === skill.keywords.length - 1
                    ? keyword
                    : keyword + ', ';

                return <span key={index}>{value}</span>;
              })}
            </div>
          </div>
        ))}
      </section>
    );
  }

  renderWork() {
    const { work } = resumeJson;

    return (
      <section id="work">
        <h2>Experience</h2>
        {work.map((workplace, index) => (
          <div key={index}>
            <h3>{workplace.position}</h3>
            <div>
              <a href="{workplace.website}">{workplace.company} </a>
              ·&nbsp;
              <span>{workplace.startDate}-</span>
              <span>{workplace.endDate}</span>
            </div>
            <List>
              {workplace.highlights.map((highlight, index2) => (
                <li
                  key={index2}
                  dangerouslySetInnerHTML={{ __html: highlight }}
                />
              ))}
            </List>
          </div>
        ))}
      </section>
    );
  }

  renderEducation() {
    const { education } = resumeJson;

    return (
      <section id="education">
        <h2>Education</h2>
        <List>
          {education.map((ed, index) => (
            <List.Item key={index}>
              {ed.institution} · {ed.studyType}, {ed.area}
            </List.Item>
          ))}
        </List>
      </section>
    );
  }
}

export default Resume;
