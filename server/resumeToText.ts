import resumeJson from './resume.json';

export function resumeToText() {
  const { basics, education, skills, work } = resumeJson;
  const phoneNum = process.env.MY_PHONE_NUM;

  const top = 'Tara Marchand';
  const emailWebsitePhone = `${process.env.MY_EMAIL} - ${
    resumeJson.basics.website
  } - ${phoneNum?.slice(0, 3)}-${phoneNum?.slice(3, 6)}-${phoneNum?.slice(
    6,
    10
  )}`;

  const profiles = `${basics.profiles.map((profile, index) => profile.url).join(' - ')}`;

  const _skills = `${skills
    .map((skill) => `${skill.name}: ${skill.keywords.join(', ')}`)
    .join('\n\n')}`;

  const _work = `${work
    .map(
      (workplace, index) => `${workplace.position}
${workplace.company} | ${workplace.startDate}-${workplace.endDate}
${workplace.highlights
  .map(
    (highlight) => `- ${highlight}
`
  )
  .join('')}`
    )
    .join('\n')}
Information about earlier positions available upon request.`;

  const _education = `${education
    .map((ed) => `${ed.institution} - ${ed.studyType}, ${ed.area}`)
    .join('\n')}
`;

  return `${top}
${emailWebsitePhone}
${profiles}

---------------------------------------------------------------------------

Summary

${_skills}

---------------------------------------------------------------------------

Experience

${_work}

---------------------------------------------------------------------------

Education

${_education}
`;
}
