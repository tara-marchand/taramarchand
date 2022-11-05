import resumeJson from '../src/data/resume.json';

export function resumeToText() {
  const { basics, education, skills, work } = resumeJson;

  const top = 'Tara Marchand';
  const emailWebsite = `${process.env.MY_EMAIL} - ${
    resumeJson.basics.website
  }`;

  const profiles = `${basics.profiles.map((profile, index) => profile.url).join(' - ')}`;

  const _skills = `${skills
    .map((skill) => `${skill.name}: ${skill.keywords.join(', ')}`)
    .join('\n\n')}`;

  const _work = `${work
    .map(
      (workplace, index) => `${workplace.position}
${workplace.company} | ${workplace.startDate}-${workplace.endDate || 'present'}
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
${emailWebsite}
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
