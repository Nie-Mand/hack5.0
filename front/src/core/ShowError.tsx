export default function ShowError({
  error,
}: {
  error: string | string[] | undefined
}) {
  if (!error) return null

  if (Array.isArray(error)) {
    return (
      <span className="text-sm text-red-500">
        {error.map((m: string) => (
          <span>
            {m}
            <br />
          </span>
        ))}
      </span>
    )
  }

  return <span className="text-sm text-red-500">{error}</span>
}
