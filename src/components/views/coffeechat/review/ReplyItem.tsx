interface Props {
  rating: number;
  content: string;
}

const ReplyItem = ({ rating, content }: Props) => {

  return (
    <>
      <p>rating: {rating}</p>
      <p>content: {content}</p>
    </>
  )
}

export default ReplyItem;