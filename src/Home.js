import { setUsers } from "./state/action-creators";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "./state";
import { useEffect } from "react";
import React from "react";

function Home() {
  const { things } = useSelector((state) => state.things);
  const dispatch = useDispatch();
  const { setThings } = bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    setThings();
  }, []);
  return (
    <div>
      <h1>Best Things</h1>
      <ul>
        {things.map((thing) => {
          return <li key={thing.id}>{thing.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Home;
