import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

class Photos {
  index(req, res) {
    fetch('https://www.instagram.com/tara/').then(response => {
      response.text().then(text => {
        const window = new JSDOM(text, {
          runScripts: 'outside-only'
        }).window;

        // find script element containing user data
        window.document.querySelectorAll('script').forEach(script => {
          if (
            !script.src &&
            script.text
              .slice(0, 49)
              .toLowerCase()
              .indexOf('shareddata') > -1
          ) {
            // add `_sharedData` to window object
            window.eval(script.text);

            const edges =
              window._sharedData.entry_data.ProfilePage[0].graphql.user
                .edge_owner_to_timeline_media.edges;
            const srcs = edges.map(edge => edge.node.thumbnail_src);

            res
              .status(200)
              .type('json')
              .send(srcs);
          }
        });
      });
    });
  }
}

export default Photos;
