export const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-8 py-24 bg-gray-100 rounded-lg">
      <h2 className="text-[24px] font-semibold text-center text-primary mb-1">
        You do not meet the role requirements for this form.
      </h2>
    </div>
  );
};
