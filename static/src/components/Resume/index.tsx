import * as React from 'react';

import { Resume } from './util';

import * as resumeJson from './resume.json';

class Resume extends React.PureComponent<{}> {
  data: Resume.Data = resumeJson.default;

  render() {
    return (
      <div id="resume">
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
    const { basics } = this.data;

    return (
      <React.Fragment>
        <h1>{basics && basics.name}</h1>
        {basics && (
          <section id="basics">
            <div>
              <span>
                <a href="mailto:tara@mac.com">{basics.email} </a>
              </span>
              <span>
                <span>·</span> <a href="{basics.website}">{basics.website}</a>
              </span>
            </div>
            {basics.profiles && (
              <section id="profiles">
                {basics.profiles.map((profile, index) => (
                  <span key={index}>
                    <a href="{profile.url}">{profile.network} </a>
                  </span>
                ))}
              </section>
            )}
          </section>
        )}
      </React.Fragment>
    );
  }

  renderSkills() {
    const { skills } = this.data;

    return (
      <React.Fragment>
        {skills && (
          <section id="skills">
            <h2>Skills</h2>
            {skills &&
              skills.map((skill, index) => (
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
        )}
      </React.Fragment>
    );
  }

  renderWork() {
    const { work } = resumeJson;

    return (
      <React.Fragment>
        {work && (
          <section id="work">
            <h2>Experience</h2>
            {work.map((workplace: Resume.Work, index: number) => {
              return (
                <div key={index}>
                  <h3>{workplace.position}</h3>
                  <div>
                    <a href="{workplace.website}">{workplace.company} </a>
                    ·&nbsp;
                    <span>{workplace.startDate}-</span>
                    <span>{workplace.endDate}</span>
                  </div>
                  <ul>
                    {workplace.highlights.map((highlight, index2: number) => (
                      <li
                        key={index2}
                        dangerouslySetInnerHTML={{ __html: highlight }}
                      />
                    ))}
                  </ul>
                </div>
              );
            })}
          </section>
        )}
      </React.Fragment>
    );
  }

  renderEducation() {
    const { education } = resumeJson;

    return (
      <React.Fragment>
        {education && (
          <section id="education">
            <h2>Education</h2>
            <ul>
              {education.map((ed: Resume.Education, index: number) => (
                <li key={index}>
                  {ed.institution} · {ed.studyType}, {ed.area}
                </li>
              ))}
            </ul>
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default Resume;
