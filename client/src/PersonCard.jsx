import "./PersonCard.css";

function PersonCard({ name, image, description }) {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <h3>{name}</h3>
      <p>Descripción: {description}</p>
      <div className="like-container">
        <button className="like-button">👍</button>
      </div>
    </div>
  );
}

export default PersonCard;
