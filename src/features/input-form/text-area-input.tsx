import { FormDefTextAreaField } from '../../@types/form-def';
import { InputTitle } from './input-title';

type Props = {
  inputDef: FormDefTextAreaField;
  value: string;
  onChange: (value: string) => void;
  validationError?: string;
  onBlur?: () => void;
  onFocus?: () => void;
};

export const TextAreaInput = ({
  inputDef,
  value,
  onChange,
  onBlur,
  onFocus,
}: Props) => {
  return (
    <div className="flex flex-col items-center w-full space-y-2">
      <InputTitle title={inputDef.name} description={inputDef.description} />
      <textarea
        rows={4}
        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
};
