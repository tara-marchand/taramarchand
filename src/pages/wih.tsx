import React, { useEffect, useState } from 'react';

type Props = {
  latestWihStory: HackerNewsStory,
  latestWihStoryComments: HackerNewsStory[]
};

const algoliaUserToken = process.env.ALGOLIA_USER_TOKEN;

// Latest Hacker News "Who Is Hiring?" story
export default function Wih (props: Props) {
  const { latestWihStory, latestWihStoryComments } = props;

  return (
    <div>
      <h2>Stories</h2>
      <div key={latestWihStory?.objectID}>
        <h3>{latestWihStory?.title}</h3>
      </div>
      <div>
        {latestWihStoryComments
          ?.filter(
            (commentStory) =>
              commentStory.parent_id?.toString() === latestWihStory.objectID
          )
          .map((commentStory) => (
            <p key={commentStory.objectID}>{commentStory.comment_text}</p>
          ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const wihStoriesResponse = await fetch(
    'https://hn.algolia.com/api/v1/search_by_date?tags=ask_hn,author_whoishiring',
    { headers: { 'X-Algolia-UserToken': algoliaUserToken } as HeadersInit }
  );
  const wihStories = await wihStoriesResponse.json();
  const latestWihStory = wihStories?.hits && wihStories?.hits[0];

  const wihStoryCommentsResponse = await fetch(
    `http://hn.algolia.com/api/v1/search?tags=comment,story_${latestWihStory.objectID}`,
    { headers: { 'X-Algolia-UserToken': algoliaUserToken } as HeadersInit }
  );
  const wihStoryComments = await wihStoryCommentsResponse.json();

  return {
    props: {
      latestWihStory,
      latestWihStoryComments: wihStoryComments.hits,
    },
  };
}
