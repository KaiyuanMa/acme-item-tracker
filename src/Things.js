import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "./state";
import { useEffect, useState } from "react";
import React from "react";
import { showCollapsible } from "../assets/animation";

function Things() {
  const [userId, setUserId] = useState("");
  const [thingId, setThingId] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputDes, setInputDes] = useState("");
  const { users } = useSelector((state) => state.users);
  const { things } = useSelector((state) => state.things);
  const { thingUsers } = useSelector((state) => state.thingUsers);
  const dispatch = useDispatch();
  const {
    setThings,
    deleteThingAction,
    emptyThingUser,
    setThingUsers,
    deleteUserThingAction,
    addThingAction,
    setUsers,
    addUserThingAction,
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    setThings();
    setUsers();
    console.log(thingId);
    console.log(thingUsers);
  }, []);

  useEffect(() => {
    setThings();
  }, [thingId]);

  const handelSubmit = () => {
    addThingAction({ name: inputName, description: inputDes });
    setThings();
    setInputName("");
    setInputDes("");
  };

  const handelUserSubmit = () => {
    addUserThingAction({ id: thingId }, { userId: userId });
    setThingUsers(thingId);
    const select = document.querySelector(".selector");
    select.value = null;
  };

  return (
    <div>
      <h1>Things {things.length}</h1>
      <div className="container">
        <div className="container-vertical">
          <div>
            <button
              className="button-list add-thing-btn collapsible-btn"
              onClick={() => showCollapsible()}
            >
              <div className="collapsible-text">+</div>
            </button>
            <form
              className="collapsible-content thingForm"
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
                value={inputDes}
                onChange={(e) => setInputDes(e.target.value)}
              />
              <button>Create</button>
            </form>
          </div>
          <ul className="scroll-list">
            {things.map((thing) => {
              return (
                <div className="container scroll-item">
                  <button
                    className={`button-list things-btn ${
                      thing.id === thingId * 1 ? "selected" : ""
                    }`}
                    key={thing.id}
                    onClick={() => {
                      setThingUsers(thing.id);
                      setThingId(thing.id);
                      if (thing.id == thingId) {
                        setThingId("");
                      }
                    }}
                  >
                    {thing.name}
                  </button>
                  <button
                    className={`del-btn ${
                      thing.id === thingId * 1 ? "show-btn" : ""
                    }`}
                    onClick={() => {
                      deleteThingAction(thing);
                      emptyThingUser();
                      setThingId("");
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
        {thingId === "" ? (
          <div class="item-container">
            {thingUsers.map((user) => {
              return (
                <div class="item">
                  <div class="container">
                    <h2>{user.name}</h2>
                    <button
                      class="del-btn item-del-btn"
                      onClick={() => {
                        deleteUserThingAction(user.id, thingId);
                        setThingUsers(thingId);
                      }}
                    >
                      X
                    </button>
                  </div>
                  <p>{user.description}</p>
                </div>
              );
            })}
          </div>
        ) : thingUsers.length !== 0 ? (
          <div class="item-container">
            {thingUsers.map((user) => {
              return (
                <div class="item">
                  <div class="container">
                    <h2>{user.name}</h2>
                    <button
                      class="del-btn item-del-btn"
                      onClick={() => {
                        deleteUserThingAction(user.id, thingId);
                        setThingUsers(thingId);
                      }}
                    >
                      X
                    </button>
                  </div>
                  <p>{user.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="item">
            <form className="user-thing-form" onSubmit={handelUserSubmit}>
              <p>Add a User</p>
              <select
                className="selector"
                onChange={(e) => setUserId(e.target.value)}
                required
              >
                <option className="defaultOption" value={""}>
                  -- select an option --
                </option>
                {users.map((user) => {
                  return <option value={user.id}>{user.name}</option>;
                })}
              </select>
              <button>Add</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Things;
