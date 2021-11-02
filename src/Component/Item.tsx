import React from "react";

interface Iprop {
  kind: string;
  artistName: string;
  trackName: string;
  artworkUrl100: string;
}

const Item: React.FC<Iprop> = ({
  kind,
  artistName,
  trackName,
  artworkUrl100,
}) => {
  return (
    <div className="item">
      {/* <p>{kind}</p> */}
      <div className="pic">
        <img src={artworkUrl100} />
      </div>
      <p className="track">{trackName}</p>
      <p className="artist">{artistName}</p>
    </div>
  );
};

export default Item;
