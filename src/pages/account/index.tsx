import { CalendarIcon } from '@heroicons/react/outline';
import { useSlashAuth } from '@slashauth/slashauth-react';
import { useContext, useEffect, useMemo } from 'react';
import { LoggedOut } from '../../common/components/LoggedOut';
import { NotAuthorized } from '../../common/components/NotAuthorized';
import { BeatLoader } from '../../common/components/spinners/beat-loader';
import ContentLayout from '../../common/layout/content';
import { RoleNameMember } from '../../constants';
import { AppContext } from '../../context';
import { EventElem } from '../../features/events/event';
import TopBar from '../../features/top-bar';
import accountGradient from '../../common/gradients/account-gradient.png';

export const AccountPage = () => {
  const { events, roles } = useContext(AppContext);

  const { isAuthenticated } = useSlashAuth();

  useEffect(() => {
    if (isAuthenticated) {
      events.fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const eventsContent = useMemo(() => {
    if (!isAuthenticated) {
      return <LoggedOut roleNameRequired={RoleNameMember} />;
    }

    if (
      !roles.data ||
      !roles.data[RoleNameMember] ||
      roles.data[RoleNameMember].loading
    ) {
      return <BeatLoader />;
    }

    if (!roles.data[RoleNameMember].data) {
      return <NotAuthorized roleNameRequired={RoleNameMember} />;
    }

    if (!events.data || events.data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 border border-gray-100 rounded-lg">
          <div className="flex flex-col p-5 rounded-full bg-indigo-50">
            <CalendarIcon
              className="w-16 h-16 text-indigo-500"
              strokeWidth={1}
            />
          </div>
          <div className="mt-4 text-[16px] font-medium text-center text-secondary">
            No upcoming events
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col space-y-4">
        {events.data.map((ev, idx) => (
          <EventElem key={`${ev.name}-${idx}`} event={ev} idx={idx} />
        ))}
      </div>
    );
  }, [events.data, isAuthenticated, roles.data]);

  return (
    <>
      <TopBar />
      <div className="relative w-full h-[300px] bg-green">
        <img
          src={accountGradient}
          className="absolute inset-0 h-[300px] w-full object-cover z-0"
          alt="Home Gradient"
        />
        <div className="absolute inset-0 flex flex-col">
          <ContentLayout fullHeight>
            <div className="flex flex-col items-start justify-center w-full h-full px-2 sm:w-2/3 sm:px-0 md: xl:w-2/5 text-banner">
              <h1 className="text-[36px] font-semibold">Your Account</h1>
              <p className="text-[21px]">
                Connect your socials and give yourself a nickname!
              </p>
            </div>
          </ContentLayout>
        </div>
      </div>
      <ContentLayout fullHeight additionalClassnames="mt-8">
        <main className="text-center text-primary">
          <div className="mt-8">{eventsContent}</div>
        </main>
      </ContentLayout>
    </>
  );
};
