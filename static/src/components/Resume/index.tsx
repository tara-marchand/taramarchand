import * as React from 'react';
import { amp } from '../../index';
import resumeJson from './resume.json';

function ResumeView() {
  let data: ResumeData = {};

  try {
    data = resumeJson;
    amp && amp.logEvent('RESUME_RENDER');
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      {renderBasics()}
      {renderWork()}
      {renderSkills()}
      {renderEducation()}
    </div>
  );

  function renderBasics() {
    const { basics } = data;

    return (
      <React.Fragment>
        {basics && (
          <section>
            <div>
              <span>
                <a href={`mailto:${basics.email}`}>{basics.email} </a>
              </span>
              <span>
                <span>·</span> <a href={basics.website}>{basics.website}</a>
              </span>
            </div>
            {basics.profiles && (
              <section>
                {basics.profiles.map((profile, index) => (
                  <span key={index}>
                    {index > 0 && (
                      <>
                        <span>·</span>{' '}
                      </>
                    )}
                    <a href={profile.url}>{profile.network} </a>
                  </span>
                ))}
              </section>
            )}
          </section>
        )}
      </React.Fragment>
    );
  }

  function renderSkills() {
    const { skills } = data;

    return (
      <React.Fragment>
        {skills && (
          <section>
            <h2>Skills</h2>
            {skills &&
              skills.map((skill: ResumeSkill, index: number) => (
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

  function renderWork() {
    const { work } = data;

    return (
      <React.Fragment>
        {work && (
          <section>
            <h2>Experience</h2>
            {work.map((workplace: ResumeWork, index: number) => {
              return (
                <div key={index}>
                  <h4>{workplace.position}</h4>
                  <div>
                    <a href={workplace.website}>{workplace.company} </a>
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
            <p>Information about earlier positions available upon request.</p>
          </section>
        )}
      </React.Fragment>
    );
  }

  function renderEducation() {
    const { education } = data;

    return (
      <React.Fragment>
        {education && (
          <section>
            <h2>Education</h2>
            <ul>
              {education.map((ed: ResumeEducation, index: number) => (
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

export default ResumeView;
