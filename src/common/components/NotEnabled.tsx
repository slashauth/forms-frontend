export const NotEnabled = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-8 py-24 bg-gray-100 rounded-lg">
      <h2 className="text-[24px] font-semibold text-center text-primary mb-6">
        Slashauth forms are not enabled for your app.
        <p className="text-secondary text-[18px] font-medium">
          Want to get early access?{' '}
          <a
            className="text-indigo-500 hover:text-indigo-600 focus:text-indigo-700"
            href="mailto:support@slashauth.xyz"
          >
            Email us
          </a>
        </p>
      </h2>
    </div>
  );
};
