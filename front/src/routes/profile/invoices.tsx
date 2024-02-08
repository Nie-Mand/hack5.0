import ProfileHeader from '~/core/ProfileHeader'
import { Button, Container } from '~/ui'
import ProfileNavigation from '~/core/ProfileNavigation'
import GalleryCard from '~/core/GalleryCard'
import Modal from '~/ui/Modal'
import UploadPostForm from '~/core/UploadPostForm'
import SuggestedUsers from '~/core/SuggestedUsers'
import MyProfileHeader from '~/core/MyProfileHeader'
import Protected from '~/Protected'
import { useGetMyPosts } from '~/core/api/posts'
import {
  Table,
  ScrollArea,
  Paper,
  Switch,
  Badge,
} from '@mantine/core'
import { useGetMyInvoices, useGetUnhanldedInvoices } from "~/core/api/users";

function Row(row: DataFormat) {
  return (
    <tr key={row.ID}>
      <td>{row.ID}</td>
      <td>{row.Owner}</td>
      <td>{row.ProductName}</td>
      <td>{row.UnitPrice}</td>
      <td>{row.Description}</td>
      <td>
        <Badge
          variant="gradient"
          gradient={
            row.Status == "Signed"
              ? { from: "teal", to: "lime", deg: 105 }
              : { from: "red", to: "pink", deg: 105 }
          }
        >
          {row.Status}
        </Badge>
      </td>
    </tr>
  );
}

function Content() {
  const x = useGetMyInvoices();

  if (x.isLoading) return <div>Loading...</div>;

  const { data } = x;

  return (
    <div className="py-10">
      <Container className="grid grid-cols-2 gap-10">
        <div className="col-span-4 xl:col-span-3">
          <MyProfileHeader />

          <ProfileNavigation />
          <div className="px-2 sm:px-6 py-6">
            <div>
              <Paper
                radius="md"
                p="xl"
                withBorder
                sx={{
                  background: "white",
                  "@media (max-width: 755px)": {
                    width: "100%",
                    margin: "0 auto",
                  },
                  marginRight: "40px",
                  marginLeft: "40px",
                  zIndex: 2,
                }}
              >
                <ScrollArea>
                  <Table verticalSpacing="xs">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Issuer</th>
                        <th>Description</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>{data && data.map((row) => <Row {...row} />)}</tbody>
                  </Table>
                </ScrollArea>
              </Paper>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default function Gallery() {
  return (
    <Protected>
      <Content />
    </Protected>
  )
}


interface DataFormat {
  id: number
  name: string
  description: string
  status: string
  by: string
}

interface TableReviewsProps {
  data: DataFormat[]
}