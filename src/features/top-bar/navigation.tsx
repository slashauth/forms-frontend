import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '../../util/classnames';
import { NavigationContext } from '../../context';

export const TopBarNavigation = () => {
  const navigation = useContext(NavigationContext);
  return (
    <div className="hidden md:-my-px md:ml-6 twotab:flex sm:space-x-8">
      {navigation.navigationItems.map((item) => (
        <Link
          key={item.name}
          to={item.pathname}
          className={classNames(
            navigation.selectedID === item.id
              ? 'border-indigo-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
