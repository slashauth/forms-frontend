import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FormDefinition } from '../../@types/form-def';
import forms from '../../assets/forms';

type Props = {
  showNotFound: boolean;
};

export const NotFound = ({ showNotFound }: Props) => {
  const formsToRender = useMemo(() => {
    const formsByID: Record<string, FormDefinition> = {};
    Object.values(forms).forEach((elem) => {
      formsByID[elem.id] = elem;
    });

    return Object.values(formsByID).sort((a, b) => {
      const aName = a.name;
      const bName = b.name;
      return aName.localeCompare(bName);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full px-8 py-24 bg-gray-100 rounded-lg">
      {showNotFound && (
        <h2 className="text-[24px] font-semibold text-center text-primary mb-6">
          No form found here
        </h2>
      )}
      <p className="text-secondary text-[18px] font-medium">
        Here's a list of your org's forms:
      </p>
      <ul className="mt-8 text-left list-disc">
        {formsToRender.map((form) => (
          <li key={form.id}>
            <Link
              className="text-indigo-500 hover:text-indigo-600 focus:text-indigo-700"
              to={`/${form.slug}`}
            >
              {form.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
