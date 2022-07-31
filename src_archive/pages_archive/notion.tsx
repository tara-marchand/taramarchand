import React from 'react';
import { Client, LogLevel } from '@notionhq/client';

type Props = {
  notionPage: unknown;
  title: string;
};

const notionInstance = new Client({
  auth: process.env.NOTION_TOKEN,
  logLevel: LogLevel.DEBUG,
});

export async function getServerSideProps() {
  const notionPage = await notionInstance.pages.retrieve({
    page_id: '9ce9dc181dd5435bb919bd2c3a764dbf',
  });

  return {
    props: {
      notionPage,
      title: notionPage.properties.title.title[0].text.content, // properties.title.title[0].text.content,
    },
  };
}

export default function notion(props: Props) {
  const { title } = props;

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
