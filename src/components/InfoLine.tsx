import React from 'react';

interface InfoLineProps {
  text: string;
}

const InfoLine: React.FC<InfoLineProps> = (props) => {
  const {
    text,
  } = props;

  if (text == null) {
    return null;
  }

  return (
    <text
      top="100%-1"
      width="100%"
      height={1}>
      {text}
    </text>
  )
};

export default React.memo(InfoLine);

