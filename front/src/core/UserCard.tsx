import { Link } from 'react-router-dom'

export default function UserCard(props: Props) {
  return (
    <div>
      <Link to={`/stars/${props.id}`}>
        <div className="flex items-center space-x-4">
          <img
            src={
              props.image ||
              'https://api.dicebear.com/5.x/lorelei-neutral/svg?seed=' +
                props.fullname +
                '&radius=50'
            }
            alt=""
            className="rounded-full w-12 h-12 md:w-16 md:h-16 object-cover"
          />
          <div className="flex-1">
            <h1 className="font-bold text-xl">{props.fullname}</h1>
            <h2 className="text-xs">{props.title}</h2>
          </div>
        </div>
      </Link>
    </div>
  )
}

interface Props {
  image?: string
  fullname: string
  title?: string
  id: string
}