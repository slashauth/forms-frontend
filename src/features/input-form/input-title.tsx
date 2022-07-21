import React from 'react';
import TextContent from '../../common/components/TextContent';

type Props = {
  title: string;
  description?: string;
};

export const InputTitle = React.memo(({ title, description }: Props) => (
  <div className="flex flex-col items-start justify-center w-full">
    <span className="text-[18px] font-semibold">{title}</span>
    {description && (
      <TextContent
        additionalClassNames="text-[16px] text-secondary"
        text={description}
      />
    )}
  </div>
));
