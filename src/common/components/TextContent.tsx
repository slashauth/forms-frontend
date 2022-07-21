import { useMemo } from 'react';
import { classNames } from '../../util/classnames';

const urlRegex = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  /((?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$]))/gi;

type Props = {
  text: string;
  additionalClassNames?: string;
};

export default function TextContent({ text, additionalClassNames }: Props) {
  const parts = useMemo(
    () =>
      text.split(urlRegex()).map((part, idx) => {
        if (idx % 2) {
          // URLs will always be at odd indices.
          return (
            // eslint-disable-next-line react/no-array-index-key
            <a
              key={`${part}-${idx}`}
              href={part}
              className="text-indigo-500 hover:text-indigo-600 focus:text-indigo-700"
            >
              {part}
            </a>
          );
        }
        return <span key={`${part}-${idx}`}>{part}</span>;
      }),
    [text]
  );

  return (
    <span
      className={classNames(
        'whitespace-pre-line',
        additionalClassNames && additionalClassNames
      )}
      style={{ overflowWrap: 'anywhere' }}
    >
      {parts}
    </span>
  );
}
