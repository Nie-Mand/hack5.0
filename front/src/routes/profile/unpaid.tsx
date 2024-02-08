import ProfileHeader from "~/core/ProfileHeader";
import { Button, Container } from "~/ui";
import ProfileNavigation from "~/core/ProfileNavigation";
import GalleryCard from "~/core/GalleryCard";
import Modal from "~/ui/Modal";
import UploadPostForm from "~/core/UploadPostForm";
import SuggestedUsers from "~/core/SuggestedUsers";
import MyProfileHeader from "~/core/MyProfileHeader";
import Protected from "~/Protected";
import { useGetMyPosts } from "~/core/api/posts";
import { Table, ScrollArea, Paper, Switch, Badge } from "@mantine/core";

import "./style.css";
import { useGetUnhanldedInvoices, useSignInvoice } from "~/core/api/users";
import { useGetMe } from "~/core/api/users/context";

function Row(row: DataFormat) {
  const { data } = useGetMe();

  const { isLoading, mutate } = useSignInvoice();

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
      <td>
        {data.username === row.Owner ? (
          <Button>Waiting to be paid</Button>
        ) : (
          <Modal>
            <Modal.Content>
              <div className="mx-5">
                <h1 className="font-semibold text-xl my-5">
                  Choose Payment Method
                </h1>

                <ul className="payment-methods">
                  <li className="payment-method paypal">
                    <input name="payment_methods" type="radio" id="paypal" />
                    <label htmlFor="paypal">ClickToPay</label>
                  </li>

                  <li className="payment-method pagseguro">
                    <input name="payment_methods" type="radio" id="pagseguro" />
                    <label htmlFor="pagseguro">Flouci</label>
                  </li>

                  <li className="payment-method bankslip">
                    <a href={row.Url} target="_blank" rel="noopener noreferrer">
                      <label>Stripe</label>
                    </a>
                  </li>
                </ul>
              </div>
            </Modal.Content>
            <Modal.Trigger variant="primary" className="hover:bg-primary-900">
              Pay Invoice
            </Modal.Trigger>
          </Modal>
        )}
      </td>
    </tr>
  );
}

function Content() {
  const unhandled = useGetUnhanldedInvoices();

  if (unhandled.isLoading) return <h1>loading</h1>;
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
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unhandled &&
                        unhandled.data.map((row) => <Row {...row} />)}
                    </tbody>
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
  );
}

interface DataFormat {
  id: number;
  name: string;
  description: string;
  status: string;
  by: string;
}

interface TableReviewsProps {
  data: DataFormat[];
}
