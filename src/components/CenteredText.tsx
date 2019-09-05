import React from 'react';

interface CenteredTextProps {
  text: string;
}

const CenteredText: React.FC<CenteredTextProps> = (props) => {
  const {
    text,
  } = props;

  return (
    <box
      top="50%-2"
      left="center"
      width={text.length}
      height={1}>
      {text}
    </box>
  );
};

export default React.memo(CenteredText);

