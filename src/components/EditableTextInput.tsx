import React, { ReactElement, useState } from 'react';

interface Props {
  value: string;
  placeholder?: string;
}

export function EditableTextInput(props: Props): ReactElement {
  const { placeholder, value } = props;
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  return (
    <div>
      {isBeingEdited ? (
        <input placeholder={placeholder} type="text" value={value} />
      ) : (
        <div>{value}</div>
      )}
      <div>
        {isBeingEdited ? (
          <div>
            Editing... (
            <span onClick={() => setIsBeingEdited(false)}>Cancel</span>)
          </div>
        ) : (
          <div onClick={() => setIsBeingEdited(true)}>Edit</div>
        )}
      </div>
    </div>
  );
}
