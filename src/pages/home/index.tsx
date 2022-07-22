import TopBar from '../../features/top-bar';
import ContentLayout from '../../common/layout/content';
import formDefs from '../../assets/forms';
import { InputForm } from '../../features/input-form';
import { useContext, useMemo } from 'react';
import { AppContext, ConfigContext } from '../../context';
import { RoleNameYcGem } from '../../constants';
import { useSlashAuth } from '@slashauth/slashauth-react';
import { LoggedOut } from '../../common/components/LoggedOut';
import { BeatLoader } from '../../common/components/spinners/beat-loader';
import { NotAuthorized } from '../../common/components/NotAuthorized';
import { NotEnabled } from '../../common/components/NotEnabled';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../common/components/NotFound';

const VALID_CLIENT_IDs = {
  W8SLanP5LEBUE6JU: true,
};

const Home = () => {
  const { formID } = useParams();

  const { isAuthenticated } = useSlashAuth();
  const { roles } = useContext(AppContext);
  const config = useContext(ConfigContext);

  const contents = useMemo(() => {
    if (!VALID_CLIENT_IDs[config.appClientID]) {
      return <NotEnabled />;
    }

    if (!isAuthenticated) {
      return <LoggedOut roleNameRequired={RoleNameYcGem} />;
    }

    if (
      !roles.data ||
      !roles.data[RoleNameYcGem] ||
      roles.data[RoleNameYcGem].loading
    ) {
      return <BeatLoader />;
    }

    if (!roles.data[RoleNameYcGem].data) {
      return <NotAuthorized />;
    }

    // eslint-disable-next-line import/namespace
    if (!formID || !formDefs[formID]) {
      return <NotFound showNotFound={formID && formID.length > 0} />;
    }
    // eslint-disable-next-line import/namespace
    return <InputForm formDef={formDefs[formID]} />;
  }, [config.appClientID, formID, isAuthenticated, roles.data]);

  return (
    <>
      <TopBar />
      <ContentLayout fullHeight additionalClassnames="mt-8">
        <main className="text-center text-primary">
          <div className="flex justify-center w-full pb-12">{contents}</div>
        </main>
      </ContentLayout>
    </>
  );
};

export default Home;
