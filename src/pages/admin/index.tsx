import { CalendarIcon } from '@heroicons/react/outline';
import { useSlashAuth } from '@slashauth/slashauth-react';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { PrimaryButton } from '../../common/components/Buttons';
import { LoggedOut } from '../../common/components/LoggedOut';
import { NotAuthorized } from '../../common/components/NotAuthorized';
import { BeatLoader } from '../../common/components/spinners/beat-loader';
import ContentLayout from '../../common/layout/content';
import { RoleNameAdmin } from '../../constants';
import { AppContext, ModalContext, ModalTypeAddEvent } from '../../context';
import { AddEventModalContents } from '../../features/add-event/modal';
import { EventElem } from '../../features/events/event';
import TopBar from '../../features/top-bar';
import { SlashauthEvent } from '../../model/event';
import adminGradient from '../../common/gradients/admin-gradient.png';

export const AdminPage = () => {
  const modalContext = useContext(ModalContext);
  const { events, roles } = useContext(AppContext);

  const { isAuthenticated } = useSlashAuth();

  useEffect(() => {
    if (isAuthenticated) {
      events.fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleAddEvent = useCallback(() => {
    modalContext.setContents(
      ModalTypeAddEvent,
      <AddEventModalContents
        onSave={async (name, description, link, date) => {
          events.addEvent(
            new SlashauthEvent(name, description, link, date.toISOString())
          );
        }}
      />,
      true
    );
  }, [events, modalContext]);

  const eventsContent = useMemo(() => {
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
  }, [events]);

  const contents = useMemo(() => {
    if (!isAuthenticated) {
      return <LoggedOut roleNameRequired="Admin" />;
    }

    if (!roles.data || roles.data[RoleNameAdmin].loading) {
      return <BeatLoader />;
    }

    if (!roles.data[RoleNameAdmin].data) {
      return <NotAuthorized roleNameRequired={RoleNameAdmin} />;
    }

    return (
      <div className="mt-8">
        <div className="flex flex-col justify-center w-full p-8 text-center">
          <div className="flex items-center justify-between w-full mb-8">
            <div className="text-[24px] font-semibold">
              Edit Your Upcoming Events
            </div>
            <PrimaryButton onClick={() => handleAddEvent()}>
              Add an Event
            </PrimaryButton>
          </div>
          {eventsContent}
        </div>
      </div>
    );
  }, [eventsContent, handleAddEvent, isAuthenticated, roles.data]);

  return (
    <>
      <TopBar />
      <div className="relative w-full h-[300px] bg-green">
        <img
          src={adminGradient}
          className="absolute inset-0 h-[300px] w-full object-cover z-0"
          alt="Home Gradient"
        />
        <div className="absolute inset-0 flex flex-col">
          <ContentLayout fullHeight>
            <div className="flex flex-col items-start justify-center w-full h-full px-2 sm:w-2/3 sm:px-0 md: xl:w-2/5 text-banner">
              <h1 className="text-[36px] font-semibold">Admin</h1>
              <p className="text-[21px]">
                The Admin page features content only accessible and editable by
                users with Admin permissions
              </p>
            </div>
          </ContentLayout>
        </div>
      </div>
      <ContentLayout fullHeight additionalClassnames="mt-8">
        <main className="text-center text-primary">
          <div className="mt-8">{contents}</div>
        </main>
      </ContentLayout>
    </>
  );
};
