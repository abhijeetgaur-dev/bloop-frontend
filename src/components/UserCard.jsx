const UserCard = ({user}) =>{
  const {firstName, lastName, photoUrl, about, age, gender} = user;
  return(
    <div className="card bg-base-300 w-96 shadow-sm">
    <figure>
      <img
        src={photoUrl}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " "+ lastName}</h2>
      <h3 className="card-about">{about}</h3>
      <p></p>
      <div className="card-actions justify-center">
        <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>
      </div>
    </div>
    </div>
  )
}

export default UserCard;

