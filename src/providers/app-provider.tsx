import { useSlashAuth } from '@slashauth/slashauth-react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { API } from '../api';
import { RoleNameAdmin, RoleNameMember } from '../constants';
import { AppContext, ConfigContext } from '../context';
import { AppMetadata } from '../model/app-metadata';
import { SlashauthEvent } from '../model/event';

type Props = {
  children: React.ReactNode;
};

type FetchedData<T> = {
  data: T | null;
  loading: boolean;
};

const AppProvider = ({ children }: Props) => {
  const [appMetadata, setAppMetadata] = useState<FetchedData<AppMetadata>>({
    data: undefined,
    loading: false,
  });

  const [events, setEvents] = useState<FetchedData<SlashauthEvent[]>>({
    data: undefined,
    loading: false,
  });

  const [roles, setRoles] = useState<{
    [roleName: string]: FetchedData<boolean>;
  }>({});

  const { getAccessTokenSilently, isAuthenticated, hasRole } = useSlashAuth();
  const config = useContext(ConfigContext);

  if (!isAuthenticated && events.data !== undefined) {
    setEvents({ data: undefined, loading: false });
  }

  if (!isAuthenticated && Object.keys(roles).length !== 0) {
    setRoles({});
  }

  const addRole = useCallback((roleName: string, response: boolean) => {
    setRoles((existing) => ({
      ...existing,
      [roleName]: {
        data: response,
        loading: false,
      },
    }));
  }, []);

  const fetchRoleData = useCallback(
    async (roleName: string): Promise<boolean> => {
      if (!isAuthenticated) {
        return false;
      }
      setRoles((existing) => ({
        ...(existing || {}),
        [roleName]: {
          data: undefined,
          loading: true,
        },
      }));
      try {
        const roleResponse = await hasRole(roleName);
        addRole(roleName, roleResponse);
        return roleResponse;
      } catch (err) {
        console.error('Failed to fetch role', err);
        addRole(roleName, false);
        return false;
      }
    },
    [addRole, hasRole, isAuthenticated]
  );

  const fetchRoles = async () => {
    await fetchRoleData(RoleNameMember);
    await fetchRoleData(RoleNameAdmin);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setRoles(undefined);
    } else {
      fetchRoles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const fetchAppMetadata =
    useCallback(async (): Promise<AppMetadata | null> => {
      setTimeout(
        () =>
          setAppMetadata({
            ...appMetadata,
            loading: true,
          }),
        0
      );
      return getAccessTokenSilently().then((token) => {
        const api = new API(config, token);
        return api
          .getAppMetadata()
          .then((metadata) => {
            setAppMetadata({
              data: metadata,
              loading: false,
            });
            return metadata;
          })
          .catch((err) => {
            console.error('Error fetching app metadata', err);
            setAppMetadata({
              data: null,
              loading: false,
            });
            return null;
          });
      });
    }, [appMetadata, config, getAccessTokenSilently]);

  const fetchEvents = useCallback(async (): Promise<
    SlashauthEvent[] | null
  > => {
    if (!isAuthenticated) {
      return null;
    }
    setEvents({
      ...events,
      loading: true,
    });

    return getAccessTokenSilently().then((token) => {
      const api = new API(config, token);
      return api
        .getEvents()
        .then((events) => {
          setEvents({
            data: events,
            loading: false,
          });
          return events;
        })
        .catch((err) => {
          console.error('Error fetching events: ', err);
          setAppMetadata({
            data: null,
            loading: false,
          });
          return null;
        });
    });
  }, [config, events, getAccessTokenSilently, isAuthenticated]);

  return (
    <AppContext.Provider
      value={{
        appMetadata: {
          ...appMetadata,
          fetch: fetchAppMetadata,
        },
        events: {
          ...events,
          fetch: fetchEvents,
          addEvent: (event: SlashauthEvent) =>
            setEvents({
              ...events,
              data: [...(events.data || []), event],
            }),
        },
        roles: {
          data: {
            ...roles,
          },
          fetch: fetchRoleData,
          fetchRoles,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
