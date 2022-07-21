type FormDefBaseFields = {
  id: string;
  name: string;
  description: string;
};

export type FormDefTextInputField = FormDefBaseFields & {
  type: 'text_input';
};

export type FormDefTextAreaField = FormDefBaseFields & {
  type: 'text_area';
};

export type FormDefEmailInputField = FormDefBaseFields & {
  type: 'email_input';
};

export type FormDefSelectField = FormDefBaseFields & {
  type: 'select';
  options: string[];
};

export type FormDefinition = {
  id: string;
  name: string;
  description: string;
  fields: (
    | FormDefTextInputField
    | FormDefTextAreaField
    | FormDefEmailInputField
    | FormDefSelectField
  )[];
};
