import { CalendarIcon } from '@heroicons/react/outline';
import { useSlashAuth } from '@slashauth/slashauth-react';
import { useCallback, useContext, useMemo, useState } from 'react';
import { API } from '../../api';
import { PrimaryButton } from '../../common/components/Buttons';
import ContentLayout from '../../common/layout/content';
import { ConfigContext, ModalContext, ModalTypeAddEvent } from '../../context';
import { AddEventModalContents } from '../../features/add-event/modal';
import { EventElem } from '../../features/events/event';
import TopBar from '../../features/top-bar';
import { SlashauthEvent } from '../../model/event';

export const AdminPage = () => {
  const config = useContext(ConfigContext);
  const { getAccessTokenSilently } = useSlashAuth();
  const modalContext = useContext(ModalContext);

  const [events, setEvents] = useState<SlashauthEvent[]>([]);
  const [fetched, setFetched] = useState(false);

  if (!fetched) {
    getAccessTokenSilently().then((token) => {
      const api = new API(config, token);

      api
        .getEvents()
        .then(setEvents)
        .catch((err) => console.error(err));
    });
    setFetched(true);
  }

  const handleAddEvent = useCallback(() => {
    modalContext.setContents(
      ModalTypeAddEvent,
      <AddEventModalContents
        onSave={async (name, description, link, date) => {
          getAccessTokenSilently().then((token) => {
            const api = new API(config, token);
            api
              .addEvent(
                new SlashauthEvent(name, description, link, date.toISOString())
              )
              .then((ev) => {
                setEvents(
                  [...events, ev].sort((a, b) => a.dateTime - b.dateTime)
                );
                modalContext.hide();
              })
              .catch((err) => console.error(err));
          });
        }}
      />,
      true
    );
  }, [config, events, getAccessTokenSilently, modalContext]);

  const eventsContent = useMemo(() => {
    if (!events || events.length === 0) {
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
        {events.map((ev, idx) => (
          <EventElem key={`${ev.name}-${idx}`} event={ev} />
        ))}
      </div>
    );
  }, [events]);

  return (
    <>
      <TopBar />
      <ContentLayout additionalClassnames="mt-8">
        <main className="text-center text-primary">
          <div className="pb-8 mt-4 mb-8 border-b border-gray-100">
            <div className="mt-4 mb-2 text-[36px] font-semibold">Admin</div>
            <div className="text-[16px] flex flex-row justify-center text-secondary">
              The Admin page features content only accessible and editable by
              users with Admin permissions
            </div>
          </div>
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
        </main>
      </ContentLayout>
    </>
  );
};
