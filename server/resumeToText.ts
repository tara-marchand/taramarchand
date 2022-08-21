import resumeJson from './resume.json';

export function resumeToText() {
  const { basics, skills } = resumeJson;
  let resumeText = 'Tara Marchand\n';

  resumeText +=
    resumeJson.basics.email + ' - ' + resumeJson.basics.website + '\n';

  basics.profiles.map((profile, index) => {
    if (index > 0) {
      resumeText += ' - ';
    }
    resumeText += profile.url;
  });
  resumeText += '\n\nSummary\n\n';

  skills.map((skill, index) => {
    resumeText += skill.name + ': ';

    skill.keywords.map((keyword, index) => {
      const value =
        index === skill.keywords.length - 1 ? keyword : keyword + ', ';
      resumeText += value;
    });
    resumeText += '\n';
  });

  return resumeText;
}
