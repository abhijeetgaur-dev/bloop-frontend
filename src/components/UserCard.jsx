const UserCard = ({user}) =>{
  const {firstName, lastName, photoUrl, about, age, gender} = user;
  return(
    <div className="card bg-base-300 w-96 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
    <figure>
      <img
        src={photoUrl}
        alt="profile-pic" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " "+ lastName}</h2>
      <h3 className="card-details">{age + ", "+ gender}</h3>
      <div className="pt-8">
      <h3 className="card-about">{about}</h3>
      </div>
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

