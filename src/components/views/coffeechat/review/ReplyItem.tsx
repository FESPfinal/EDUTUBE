import RatingStarGroup from "@/components/atom/RatingStarGroup";

interface Props {
  rating: number;
  content: string;
  userName: string;
  createdAt: string;
}

const ReplyItem = ({ rating, content, userName, createdAt }: Props) => {

  return (
    <div className="relative p-4 mb-4">
      <div className="flex items-center mb-2">
        <p className="mr-3 text-lg text-gray-700 font-medium">{userName}</p>
        <RatingStarGroup isReadOnly={true} defaultRate={rating} />
      </div>
      <p className="text-gray-700 mb-2">{content}</p>
      <p className="text-sm text-gray-500">{createdAt}</p>
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gray-300"></div>
    </div>
  )
}

export default ReplyItem;