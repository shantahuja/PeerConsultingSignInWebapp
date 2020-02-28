import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastsContainer, ToastsStore } from "react-toasts";

export default function EditSubject() {
  const [newNameState, setNewNameState] = useState("");
  const [newDescriptionState, setNewDescriptionState] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/subjectCollection/" + id)
      .then(response => {
        setNewNameState(response.data.name);
        setNewDescriptionState(response.data.description);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const onChangeName = e => {
    const name = e.target.value;
    setNewNameState(name);
  };

  const onChangeDescription = e => {
    const description = e.target.value;
    setNewDescriptionState(description);
  };

  const onSubmit = e => {
    const subject = {
      name: newNameState,
      description: newDescriptionState
    };

    console.log(subject);

    axios
      .post("http://localhost:5000/subjectCollection/update/" + id, subject)
      .then(response => {
        ToastsStore.success(
          "Subject Successfully Edited.\nTaking you back to subject list..."
        );
        console.log(response.data);
        window.setTimeout(function() {
          window.location.reload();
        }, 4000);
        window.location.assign("http://localhost:3000/subjectList");
      })
      .catch(error => {
        ToastsStore.error("Bad request to server!");
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Edit Subject</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            required
            className="form-control"
            value={newNameState}
            onChange={onChangeName}
          ></input>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={newDescriptionState}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary mt-3"
          >
            Sign-In!
          </button>
        </div>
        <ToastsContainer store={ToastsStore} position={"top_center"} />
      </form>
    </div>
  );
}
