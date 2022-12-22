import Link from 'next/link';
import React from 'react';

export async function getResumeData() {
  const data = (await import('../../data/resume.json')).default;
  return data;
}

export default async function Resume() {
  const data = await getResumeData();
  const { basics, education, skills, work } = data;

  return (
    <div>
      <p>
        <Link href="./resume.txt">(Text version)</Link>
      </p>
      {basics?.profiles && (
        <section>
          {basics?.profiles.map((profile, index) => (
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
      <section>
        <h2>Summary</h2>
        {skills?.map((skill: ResumeSkill, index: number) => {
          switch (skill.name) {
            case 'Languages':
              return (
                <div className="pb-4" key={index}>
                  <strong>{skill.name}</strong>
                  <div>
                    {skill.keywords.map((keyword, index) => (
                      <span key={index}>
                        {keyword}
                        {index === skill.keywords.length - 1 ? '' : ', '}
                      </span>
                    ))}
                  </div>
                </div>
              );
            case 'Technologies':
            case 'Interests':
            default:
              return (
                <div className="pt-2" key={index}>
                  <strong>{skill.name}</strong>
                  <ul className="columns-2 gap-8">
                    {skill.keywords.map((keyword, index) => (
                      <li key={index}>{keyword}</li>
                    ))}
                  </ul>
                </div>
              );
          }
        })}
      </section>
      <section>
        <h2>Experience</h2>
        {work?.map((workplace, index: number) => {
          return (
            <div key={index}>
              <h4>{workplace.position}</h4>
              <div>
                <a href={workplace.website}>{workplace.company} </a>
                ·&nbsp;
                <span>{workplace.startDate}-</span>
                <span>{workplace.endDate || 'present'}</span>
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
      <section>
        <h2>Education</h2>
        <ul>
          {education?.map((ed, index: number) => (
            <li key={index}>
              {ed.institution} · {ed.studyType}, {ed.area}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
