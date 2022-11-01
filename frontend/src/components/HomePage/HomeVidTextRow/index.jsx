const HomeVidTextRow = ({ position, video, title, text }) => {
  return (
    <div className="sec-two-row">
      {position === "left" ? (
        <>
          <video src={video} autoPlay loop muted />
          <div className="home-row-text">
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        </>
      ) : (
        <>
          <div className="home-row-text">
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <video src={video} autoPlay loop muted />
        </>
      )}
    </div>
  );
};

export default HomeVidTextRow;
