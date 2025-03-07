const UserCard = () =>{
  // const{firstName, lastName ,about}  = feed.data;

  return(
    <div className="card bg-base-300 w-96 shadow-sm">
    <figure>
      <img
        src="https://media.licdn.com/dms/image/v2/D4D03AQGRzPxsf3C8Wg/profile-displayphoto-shrink_400_400/B4DZQySoWQGUAg-/0/1736010532731?e=1746662400&v=beta&t=ikwPQfZwKgnESGV7f4Wd_4baw-UAYu10Ern0jHVihqI"
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Abhijeet Gaur</h2>
      <p>Frontend developer with a passion for crafting seamless user experiences.</p>
      <div className="card-actions justify-center">
        <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>
      </div>
    </div>
    </div>
  )
}

export default UserCard;

