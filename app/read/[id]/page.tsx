const Read = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <h2>Read</h2>
      parameters: {id}
    </>
  );
};

export default Read;
