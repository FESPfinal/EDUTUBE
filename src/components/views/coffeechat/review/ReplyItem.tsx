import RatingStarGroup from "@/components/atom/RatingStarGroup";

interface Props {
  rating: number;
  content: string;
  userName: string;
  createdAt: string;
}

const ReplyItem = ({ rating, content, userName, createdAt }: Props) => {

  return (
    <div className="border-2 border-gray-500">
      <RatingStarGroup isReadOnly={true} defaultRate={rating} />
      <p>{userName}</p>
      <p> {content}</p>
      <p>{createdAt}</p>
    </div>
  )
}

export default ReplyItem;