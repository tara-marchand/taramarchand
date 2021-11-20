import React from 'react';

export type ShowData = {
  id: string;
  name: string;
  url: string;
};

type Props = {
  data?: ShowData;
};

export const Show = (props: Props) => {
  const { data } = props;

  if (!data) {
    return null;
  }

  return (
    <div>
      <a href={data.url} target="_blank">
        {data.name}
      </a>
    </div>
  );
};
