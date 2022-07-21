import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationContext } from '../context';

export enum LeftBarID {
  Home = 'home',
  Account = 'account',
  Events = 'events',
  Contact = 'contact',
  Admin = 'admin',
}

export type SidebarItem = {
  hidden?: boolean;
  newPage?: boolean;
  id: string;
  name: string;
  pathname: string;
  alternatePathnames?: string[];
  icon: React.ElementType;
};

const items: SidebarItem[] = [];

export type NavigationState = {
  navigationItems: SidebarItem[];
  selectedID: string | null;
  showSignInButton: boolean;
  setShowSignInButton: (show: boolean) => void;
};

type Props = {
  children: React.ReactNode;
};

export const NavigationProvider = ({ children }: Props) => {
  const location = useLocation();
  const [showSignInButton, setShowSignInButton] = useState(true);

  const selectedItem = useMemo<SidebarItem | null>(
    () =>
      items.find(
        (elem) =>
          location.pathname.toLowerCase() === elem.pathname ||
          (elem.alternatePathnames &&
            elem.alternatePathnames.some((altPath) =>
              location.pathname.toLowerCase().startsWith(altPath)
            ))
      ) || null,
    [location.pathname]
  );

  const navigation = {
    navigationItems: items.filter((val) => !val.hidden),
    selectedID: selectedItem?.id || null,
    showSignInButton,
    setShowSignInButton,
  };

  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  );
};
