const VideoInfo = ({
  params: { _id, list },
}: {
  params: { _id: string; list: string };
}) => {
  return (
    <h3>
      Video Info _id:{_id}, list:{list}
    </h3>
  );
};

export default VideoInfo;
