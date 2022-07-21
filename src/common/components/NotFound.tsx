export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-8 py-24 bg-gray-100 rounded-lg">
      <h2 className="text-[24px] font-semibold text-center text-primary mb-6">
        No form found here
        <p className="text-secondary text-[18px] font-medium">
          Did we make a mistake?{' '}
          <a
            className="text-indigo-500 hover:text-indigo-600 focus:text-indigo-700"
            href="mailto:support@slashauth.xyz"
          >
            Email us
          </a>{' '}
          and let us know.
        </p>
      </h2>
    </div>
  );
};
