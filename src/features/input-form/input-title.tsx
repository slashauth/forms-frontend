import React from 'react';
import TextContent from '../../common/components/TextContent';

type Props = {
  title: string;
  description?: string;
  required?: boolean;
};

export const InputTitle = React.memo(
  ({ title, description, required }: Props) => (
    <div className="flex flex-col items-start justify-center w-full">
      <div className="flex justify-between w-full">
        <span className="text-[18px] font-semibold">{title}</span>
        {required && <span className="text-red-400">*</span>}
      </div>
      {description && (
        <TextContent
          additionalClassNames="text-[16px] text-secondary"
          text={description}
        />
      )}
    </div>
  )
);
