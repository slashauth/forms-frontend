import { PrimaryButton } from '../../common/components/Buttons';
import ContentLayout from '../../common/layout/content';
import TopBar from '../../features/top-bar';

export const ContactPage = () => {
  return (
    <>
      <TopBar />
      <ContentLayout additionalClassnames="mt-8">
        <main className="text-center text-primary">
          <div className="pb-8 mt-4 mb-8 border-b border-gray-100">
            <div className="mt-4 mb-2 text-[36px] font-semibold">
              Contact us
            </div>
            <div className="text-[16px] flex flex-row justify-center text-secondary">
              Allow members to contact you directly with a gated Contact Us
              page.
            </div>
          </div>
          <div className="mt-8">
            <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg bg-indigo-50">
              <div className="text-[24px] font-semibold">
                Need to contact us?
              </div>
              <div className="text-[18px]">
                Join our super secret member only discord via this link:
              </div>
              <a
                href="https://discord.gg/QWQWQWQW"
                className="mt-4"
                target="_blank"
                rel="noreferrer"
              >
                {/*eslint-disable-next-line @typescript-eslint/no-empty-function*/}
                <PrimaryButton onClick={() => {}}>
                  Join Secret Discord
                </PrimaryButton>
              </a>
            </div>
          </div>
        </main>
      </ContentLayout>
    </>
  );
};
