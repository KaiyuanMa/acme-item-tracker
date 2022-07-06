import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "./state";
import { useEffect, useState } from "react";
import React from "react";
import { showCollapsible } from "../assets/animation";

function Users() {
  const [userId, setUserId] = useState("");
  const [thingId, setThingId] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputBio, setInputBio] = useState("");
  const { users } = useSelector((state) => state.users);
  const { userThings } = useSelector((state) => state.userThings);
  const { unownedThings } = useSelector((state) => state.unownedThings);
  const dispatch = useDispatch();
  const {
    setUsers,
    setUserThings,
    deleteUserAction,
    emptyUserThing,
    addUserAction,
    deleteUserThingAction,
    unownedThingsAction,
    addUserThingAction,
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    setUsers();
    unownedThingsAction();
  }, []);

  useEffect(() => {
    setUsers();
  }, [userId]);

  const handelSubmit = () => {
    addUserAction({ name: inputName, description: inputBio });
    setUsers();
    setInputName("");
    setInputBio("");
  };
  const handelThingSubmit = () => {
    addUserThingAction({ id: thingId }, { userId: userId });
    setUserThings(userId);
    unownedThingsAction();
    const select = document.querySelector(".selector");
    select.value = null;
  };

  return (
    <div>
      <h1>Users {users.length}</h1>
      <div className="container">
        <div className="container-vertical">
          <div>
            <button
              className="button-list add-user-btn collapsible-btn"
              onClick={() => showCollapsible()}
            >
              <div className="collapsible-text">+</div>
            </button>
            <form
              className="collapsible-content userForm"
              onSubmit={() => {
                handelSubmit();
              }}
            >
              <label>Name</label>
              <input
                type="text"
                required
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
              <label>Description</label>
              <textarea
                type="text"
                required
                value={inputBio}
                onChange={(e) => setInputBio(e.target.value)}
              />
              <button>Create</button>
            </form>
          </div>
          <ul className="scroll-list">
            {users.map((user) => {
              return (
                <div className="container scroll-item">
                  <button
                    className={`button-list ${
                      user.id === userId * 1 ? "selected" : ""
                    }`}
                    key={user.id}
                    onClick={() => {
                      setUserThings(user.id);
                      setUserId(user.id);
                      if (user.id == userId) {
                        setUserId("");
                      }
                    }}
                  >
                    {user.name}
                  </button>
                  <button
                    className={`del-btn ${
                      user.id === userId * 1 ? "show-btn" : ""
                    }`}
                    onClick={() => {
                      deleteUserAction(user);
                      emptyUserThing();
                      setUserId("");
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="item-container">
          {userId !== "" ? (
            <div className="item">
              <form className="user-thing-form" onSubmit={handelThingSubmit}>
                <select
                  className="selector"
                  onChange={(e) => setThingId(e.target.value)}
                  required
                >
                  <option className="defaultOption" value={""}>
                    -- select an option --
                  </option>
                  {unownedThings.map((thing) => {
                    return <option value={thing.id}>{thing.name}</option>;
                  })}
                </select>
                <button>Add</button>
              </form>
            </div>
          ) : (
            ""
          )}
          {userThings.map((thing) => {
            return (
              <div className="item">
                <div className="container">
                  <h2>{thing.name}</h2>
                  <button
                    className="del-btn item-del-btn"
                    onClick={() => {
                      deleteUserThingAction(userId, thing.id);
                      setUserThings(userId);
                      unownedThingsAction();
                    }}
                  >
                    X
                  </button>
                </div>
                <p>{thing.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Users;
