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
        <h1>{this.state.resume.basic.name}</h1>
        <section id="basics">
          <div className="contact">
            <span className="email">
              <a href="mailto:tara@mac.com">tara@mac.com</a>
            </span>
            <span className="website">
              <span className="dot">·</span> <a href="http://www.tmarchand.com/">http://www.tmarchand.com/</a>
            </span>
          </div>
          <section id="profiles">
            <span className="item">
              <a href="https://github.com/tara-marchand" className="network">GitHub</a>
            </span>
            <span className="item">
              <span className="dot">·</span> <a href="http://www.linkedin.com/in/trmarch/" className="network">LinkedIn</a>
            </span>
            <span className="item">
              <span className="dot">·</span> <a href="https://twitter.com/trmarchand" className="network">Twitter</a>
            </span>
          </section>
        </section>
        <hr />
        <section id="skills">
          <h2>Skills</h2>
          <ul className="item">
            <li>
              <ul className="keywords">
                <strong>Languages:</strong> 
                <li>JavaScript</li>
                <li>CSS</li>
                <li>HTML</li>
                <li>Python</li>
                <li>PHP</li>
              </ul>
            </li>
          </ul>
          <ul className="item">
            <li>
              <ul className="keywords">
                <strong>Tools:</strong> 
                <li>client-side JavaScript libraries and frameworks (Angular, React)</li>
                <li>CSS preprocessors (SASS, LESS, PostCSS)</li>
                <li>version control systems (git, Perforce)</li>
                <li>build &amp; deployment tools (gulp, webpack)</li>
                <li>package managers (npm)</li>
                <li>content management systems &amp; frameworks (WordPress, Django, CodeIgniter)</li>
              </ul>
            </li>
          </ul>
          <ul className="item">
            <li>
              <ul className="keywords">
                <strong>Interests:</strong> 
                <li>software design &amp; architecture</li>
                <li>API integration</li>
                <li>mobile-first &amp; responsive design</li>
                <li>user experience &amp; interaction design</li>
                <li>agile methodologies</li>
                <li>continuous integration</li>
                <li>performance</li>
              </ul>
            </li>
          </ul>
        </section>
        <hr />
        <section id="work">
          <h2>Experience</h2>
          <div className="item">
            <h3 className="position">
              Technology Lead
            </h3>
            <div className="name-date">
              <a href="http://www.rga.com/">R/GA</a>
              ·
              <span className="startDate">
                2009
              </span>
              <span className="endDate">
                - present
              </span>
            </div>
            <ul className="highlights">
              <li><strong>Google:</strong> As part of embedded agency team, do server-side and database development for new internal application with many complex integrations</li>
              <li><strong>Dignity Health:</strong> Led technology discipline agency-side for this large healthcare client. Analyzed, recommended, and maintained digital solutions</li>
              <li><strong>Nike Events Tool:</strong> Led front-end development for this platform's localized, mobile-friendly web experiences used by tens of thousands of customers globally. Manage 2 front-end engineers. Integrate with custom APIs. Example calendar: <a href="https://www.nike.com/events-registration/series?id=1607&days=7" target="_blanks">Nike+ San Francisco</a></li>
              <li><strong>Microsoft Surface:</strong> Architected and wrote presentation layer code for this fully responsive website developed for the launch of this tablet device. Integrated with custom CMS and API.</li>
              <li><strong>Nike+ FuelBand:</strong> Helped build the web application front end for the debut of this pioneering activity tracker. Created complex visualizations from user data in JavaScript.</li>
              <li>Promoted from Front End Solutions Architect and previously from Senior Presentation Code Developer.</li>
            </ul>
          </div>
          <div className="item">
            <h3 className="position">
              User Interface Developer
            </h3>
            <div className="name-date">
              <a href="http://www.dhapdigital.com/">DHAP Digital</a>
              ·
              <span className="startDate">
                2007
              </span>
              <span className="endDate">
                - 2009
              </span>
            </div>
            <ul className="highlights">
              <li><strong>Adobe Marketplace:</strong> Helped develop the user interface for this new web application offering publishing and downloading of extensions and other add-ons for the company's Air and Photoshop software.</li>
              <li><strong>Lexus.com:</strong> Worked on the front ends of Lexus.com and other websites for related brands Toyota and Scion, managing code in the TeamSite content management system.</li>
            </ul>
          </div>
          <div className="item">
            <h3 className="position">
              Senior User Interface Developer
            </h3>
            <div className="name-date">
              Publicis Modem
              ·
              <span className="startDate">
                2005
              </span>
              <span className="endDate">
                - 2007
              </span>
            </div>
            <ul className="highlights">
              <li><strong>Amgen and Wyeth:</strong> Created the UIs for patient education websites (Enbrel.com, InsideRA.com, PsoriasisConnections.com) for Amgen's top-selling drug Enbrel.</li>
              <li><strong>Amgen; Sprint:</strong> Built emails and launched large campaigns using a complex email marketing platform, then analyzed resulting data.</li>
              <li>Promoted from User Interface Developer.</li>
            </ul>
          </div>
          {/* <div className="item">
            <h3 className="position">
              Educational Technology Developer
            </h3>
            <div className="name-date">
              <a href="http://meded.ucsf.edu/tel">Office of Educational Technology, UC San Francisco School of Medicine</a>
              ·
              <span className="startDate">
                2003
              </span>
              <span className="endDate">
                - 2004
              </span>
            </div>
            <ul className="highlights">
              <li>Created content for educational microsites and administered calendars and online courses for students, faculty, and staff in the UCSF medical community.</li>
              <li>Provided hands-on technology support for medical school classroom instructors' hardware and software needs.</li>
            </ul>
          </div>
          <div className="item">
            <h3 className="position">
              UC Berkeley Extension Online
            </h3>
            <div className="name-date">
              Principal Web Designer
              ·
              <span className="startDate">
                2000
              </span>
              <span className="endDate">
                - 2003
              </span>
            </div>
            <ul className="highlights">
              <li>Developed the user interface for online courses on a myriad of subjects offered by UC Berkeley's prestigious Extension program.</li>
              <li>Organized, edited, and illustrated online course content.</li>
              <li>Promoted from <strong>Senior Web Designer</strong>.</li>
            </ul>
          </div> */}
        </section>
        <hr />
        <section id="education">
          <h2>Education</h2>
          <ul className="education">
            <li className="item">
              University of California, Santa Barbara
              · MA, Biopsychology
            </li>
            <li className="item">
              University of California, Davis
              · BS, Psychology (Biology Emphasis)
            </li>
          </ul></section>
      </div>
    );
  }
}

export default Resume;
