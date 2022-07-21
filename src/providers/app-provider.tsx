import { useSlashAuth } from '@slashauth/slashauth-react';
import { useCallback, useEffect, useState } from 'react';
import { RoleNameYcGem } from '../constants';
import { AppContext } from '../context';

type Props = {
  children: React.ReactNode;
};

type FetchedData<T> = {
  data: T | null;
  loading: boolean;
};

const AppProvider = ({ children }: Props) => {
  const [roles, setRoles] = useState<{
    [roleName: string]: FetchedData<boolean>;
  }>({});

  const { isAuthenticated, hasRole } = useSlashAuth();

  if (!isAuthenticated && roles && Object.keys(roles).length !== 0) {
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
    await fetchRoleData(RoleNameYcGem);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setRoles(undefined);
    } else {
      fetchRoles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <AppContext.Provider
      value={{
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
