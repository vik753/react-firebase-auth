import React from "react";
import fire from "../config/fire";

const Home = ({ user }) => {
  const db = fire.database();
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [eventName, setEventName] = React.useState("");
  const [created, setCreated] = React.useState("");
  const [pets, setPets] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [eventPetId, setEventPetId] = React.useState("");

  const getData = React.useCallback(() => {
    const ref = db.ref(`users/${user.uid}/`);
    ref.on(
      "value",
      (snapshot) => {
        const { events, pets } = snapshot.val();
        setPets(() => pets);
        setEvents(() => events);
      },
      (error) => {
        const { code, message } = error;
        console.log(`DataSnapshot error! Code: ${code}. Message: ${message}`);
        alert(`DataSnapshot error! Code: ${code}. Message: ${message}`);
      }
    );
  }, [db, user.uid]);

  React.useEffect(() => {
    getData();
  }, [getData]);

  const logoutHandler = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signOut()
      .then(() => {
        alert(`You are logged out!`);
      })
      .catch((err) => {
        const { code, message } = err;
        console.log(`Logout error! Code: ${code}. Message: ${message}`);
        alert(`Logout error! Code: ${code}. Message: ${message}`);
      });
  };

  const savePetHandler = () => {
    const id = `${Math.floor(Math.random() * Date.now())}${Math.floor(
      Math.random() * Date.now()
    )}`;

    const petsRef = db.ref(`users/${user.uid}/pets/${id}`);

    petsRef.set({
      id,
      name,
      age,
    });
  };

  const saveEvent = () => {
    const id = `${Math.floor(Math.random() * Date.now())}${Math.floor(
      Math.random() * Date.now()
    )}`;

    const petsRef = db.ref(`users/${user.uid}/events/${id}`);

    petsRef.set({
      id,
      eventName,
      created,
      eventPetId,
    });
  };

  return (
    <div>
      <h1>You are logged in as: {user.email}</h1>
      <p>Yur uid is: {user.uid}</p>
      <button onClick={logoutHandler}>LogOut</button>
      <div>
        <h2>Pets</h2>
        <input
          type="text"
          placeholder="name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="age"
          defaultValue={age}
          min={0}
          onChange={(e) => setAge(+e.target.value)}
        />
        <button onClick={savePetHandler}>Save</button>
      </div>
      <div>
        <h2>Scheduler</h2>
        <select
          name="pets"
          id="pets"
          required={true}
          onChange={(e) => setEventPetId(e.target.value)}
        >
          <option value="">choose pet</option>
          {Object.values(pets).map((pet) => {
            return (
              <option value={pet.id} key={pet.id}>
                {pet.name}, {pet.age}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          placeholder="event name"
          defaultValue={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="datetime-local"
          onChange={(e) => setCreated(e.target.value)}
        />
        <button onClick={saveEvent}>Save event</button>
      </div>
    </div>
  );
};

export default Home;
