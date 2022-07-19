import { CalendarIcon } from '@heroicons/react/outline';
import { useSlashAuth } from '@slashauth/slashauth-react';
import { useContext, useMemo, useState } from 'react';
import { API } from '../../api';
import ContentLayout from '../../common/layout/content';
import { ConfigContext } from '../../context';
import { EventElem } from '../../features/events/event';
import TopBar from '../../features/top-bar';
import { SlashauthEvent } from '../../model/event';

export const EventsPage = () => {
  const config = useContext(ConfigContext);
  const { getAccessTokenSilently } = useSlashAuth();

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
            <div className="mt-4 mb-2 text-[36px] font-semibold">
              Upcoming Events
            </div>
            <div className="text-[16px] flex flex-row justify-center text-secondary">
              Keep your community in the loop with a member-only Events page.
            </div>
          </div>
          <div className="mt-8">{eventsContent}</div>
        </main>
      </ContentLayout>
    </>
  );
};
