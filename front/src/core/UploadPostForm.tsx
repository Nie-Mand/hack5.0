import { Button, Input } from '~/ui'
import { AiOutlineUpload as UploadIcon } from '~/core/icons'
import { useCreatePost } from './api/posts'

export default function UploadPostForm() {
  const { isLoading, mutate } = useCreatePost()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values = Object.fromEntries(formData.entries())

    mutate(values)
  }

  return (
    <form
      className="flex flex-col space-y-3 p-4 w-64 sm:w-96"
      onSubmit={handleSubmit}
    >
      <h1 className="font-semibold text-xl">Upload new Post</h1>
      <Input type="textarea" label="Caption" required name="caption" />
      <Input
        type="file"
        required
        name="image"
        label="Upload Picture"
        suffix={<UploadIcon className="text-xl" />}
      />
      <div>
        <Button variant="primary" type="submit" loading={isLoading}>
          Upload
        </Button>
      </div>
    </form>
  )
}
