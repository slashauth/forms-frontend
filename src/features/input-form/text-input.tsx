import { FormDefTextInputField } from '../../@types/form-def';
import { InputWithValidation } from '../../common/form/InputWithValidation';
import { InputTitle } from './input-title';

type Props = {
  inputDef: FormDefTextInputField;
  value: string;
  onChange: (value: string) => void;
  validationError?: string;
  onBlur?: () => void;
  onFocus?: () => void;
};

export const TextInput = ({
  inputDef,
  value,
  onChange,
  validationError,
  onBlur,
  onFocus,
}: Props) => {
  return (
    <div className="flex flex-col items-center w-full space-y-2">
      <InputTitle title={inputDef.name} description={inputDef.description} />
      <div className="w-full">
        <InputWithValidation
          value={value}
          onTextChange={onChange}
          validationError={validationError}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
    </div>
  );
};
