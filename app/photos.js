import cloudinary from 'cloudinary';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

const getFilenameFromUrl = (url) => url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."));

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
            // filenames
            const srcs = edges.map(edge => {
              const filename = getFilenameFromUrl(edge.node.thumbnail_src);
              const imageUrl = `http://res.cloudinary.com/hlvbevjxx/${filename}`;

              cloudinary.v2.uploader.upload(
                edge.node.thumbnail_src,
                { public_id: getFilenameFromUrl(edge.node.thumbnail_src) },
                function(error, result) {
                  console.log(result);
                }
              );

              return 
          }
          // check for file's existence in cloudinary
            // if exists, return
            // if does not exist, upload, return

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
