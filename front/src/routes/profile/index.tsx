import ProfileHeader from '~/core/ProfileHeader'
import { Button, Container } from '~/ui'
import ProfileNavigation from '~/core/ProfileNavigation'
import SuggestedUsers from '~/core/SuggestedUsers'
import { useGetMe } from '~/core/api/users/context'
import MyProfileHeader from '~/core/MyProfileHeader'
import Protected from '~/Protected'


function Content() {
  const { data } = useGetMe()

  if (!data) return <></>;
  return (
    <div className="py-10">
      <Container className="grid grid-cols-2 gap-10">
        <div className="col-span-4 xl:col-span-3">
          <MyProfileHeader />
          <ProfileNavigation />
          <div className="px-2 sm:px-6 py-6">
            {data && data.bio ? data.bio : "No bio"}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function Index() {
  return (
    <Protected>
      <Content />
    </Protected>
  );
}
