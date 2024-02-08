import { useCountMySponsors } from './api/sponsor'
import { useGetMe } from './api/users/context'
import ProfileHeader from './ProfileHeader'

export default function MyProfileHeader() {
  const { data } = useGetMe();
  const count = 40; // useCountMySponsors()

  return (
    <ProfileHeader
      role={data.role}
      profilePicture={data.image}
      coverPicture={data.coverPicture}
      name={data.title}
      title={"@" + data.username}
      // sponsorsCount={count.isLoading ? "~" : count.data}
      actions={null}
      location={data.location}
    />
  );
}
