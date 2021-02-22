import { AmplitudeClient } from 'amplitude-js';
import React from 'react';
import resumeJson from '../data/resume.json';

interface Props {
  amplitude?: AmplitudeClient;
}

export default function resume(props: Props): JSX.Element {
  let data: ResumeData = {};

  const { amplitude } = props;

  try {
    data = resumeJson;
  } catch (error) {
    console.log(error);
  }

  amplitude && amplitude.logEvent('RESUME_RENDER');

  return (
    <div>
      {renderBasics(data)}
      {renderWork(data)}
      {renderSkills(data)}
      {renderEducation(data)}
    </div>
  );
}

function renderBasics(data: ResumeData): JSX.Element | null {
  const { basics } = data;

  if (!basics) {
    return null;
  }

  return (
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
  );
}

function renderSkills(data: ResumeData): JSX.Element | null {
  const { skills } = data;

  if (!skills) {
    return null;
  }

  return (
    <section>
      <h2>Skills</h2>
      {skills.map((skill: ResumeSkill, index: number) => (
        <div key={index}>
          <div>
            <strong>{skill.name}: </strong>
            {skill.keywords.map((keyword, index) => {
              const value =
                index === skill.keywords.length - 1 ? keyword : keyword + ', ';

              return <span key={index}>{value}</span>;
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

function renderWork(data: ResumeData): JSX.Element | null {
  const { work } = data;

  if (!work) {
    return null;
  }

  return (
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
  );
}

function renderEducation(data: ResumeData): JSX.Element | null {
  const { education } = data;

  if (!education) {
    return null;
  }

  return (
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
  );
}
