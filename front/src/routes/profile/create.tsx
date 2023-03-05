import ProfileHeader from "~/core/ProfileHeader";
import ProfileNavigation from "~/core/ProfileNavigation";
import { Button, Container, Input } from "~/ui";
import {
  AiOutlineUpload as UploadIcon,
  ImBlocked as BlockedIcon,
  AiOutlineUser as UserIcon,
  MdOutlineTitle as TitleIcon,
} from "~/core/icons";
import { useCreateInvoice, useUpdateMe } from "~/core/api/users";
import ShowError from "~/core/ShowError";
import { useGetMe } from "~/core/api/users/context";
import MyProfileHeader from "~/core/MyProfileHeader";
import Protected from "~/Protected";
import { useIPFS } from "react-ipfs";

function Content() {
  const { isLoading, mutate, error } = useCreateInvoice();
  const { data } = useGetMe();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(data.entries());

    const file = values["invoicedocument"] as File;

    console.log(file);

    // const buff = Buffer.from(file);

    // console.log(buff);
    // only the ones that's not empty
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value !== "")
    );

    // ipfs.files.add(testBuffer, function (err, file) {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log(file);
    // });

    // mutate({
    //   ...filteredValues,
    //   unitPrice: Number(filteredValues.unitPrice),
    //   // quantity: Number(filteredValues.quantity),
    //   url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
    // });
  }

  return (
    <div className="py-10">
      <Container className="grid grid-cols-2 gap-10">
        <div className="col-span-4 xl:col-span-3">
          <MyProfileHeader />
          <ProfileNavigation />
          <div className="px-2 sm:px-6 py-10">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
              <div className="flex flex-col space-y-3">
                <h1 className="font-semibold text-xl">Product Information</h1>
                <Input type="text" label="Product Name" name="productName" />
                {/* <Input type="number" label="Qunatity" name="quantity" /> */}
                <Input type="number" label="Price" name="unitPrice" />
                <Input type="textarea" label="Description" name="description" />
              </div>
              <hr />
              <div className="flex flex-col space-y-3">
                <h1 className="font-semibold text-xl">Customer Information</h1>
                <Input type="text" label="Customer Username" name="customer" />
                <Input
                  type="file"
                  label="Invoice as PDF or PNG"
                  name="invoicedocument"
                  suffix={<UploadIcon className="text-xl" />}
                />
              </div>
              <ShowError error={(error as any)?.response?.data?.message} />
              <div className="flex justify-end">
                <Button variant="primary" type="submit" loading={isLoading}>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default function Settings() {
  return (
    <Protected>
      <Content />
    </Protected>
  );
}
