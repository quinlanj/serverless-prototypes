// Now in your App.js
import { useState } from "react";

import { useInit, useAdhocQuery, adhocTransact,  tx, auth, id, useGetGoals, useAddTodos } from "./placeholders/db/react";


function App() {
  // 3. Init
  const [isLoading, error, auth] = useInit();
  if (isLoading) {
    return <div>...</div>;
  }
  if (error) {
    return <div>Oi! {error?.message}</div>;
  }
  // Uncomment below to enable auth
  // if (!auth) {
  //   return <Login />;
  // }
  return <Main />;
}

// 4. Log users in!
function Login() {
  const [state, setState] = useState({
    sentEmail: "",
    email: "",
    code: "",
  });
  const { sentEmail, email, code } = state;
  return (
    <div>
      <div>
        {!sentEmail ? (
          <div key="em">
            <h2>Let's log you in!</h2>
            <div>
              <input
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  setState({ ...state, sentEmail: email });
                  auth.sendMagicCode({ email }).catch((err: any) => {
                    alert("Uh oh :" + err.body?.message);
                    setState({ ...state, sentEmail: "" });
                  });
                }}>
                Send Code
              </button>
            </div>
          </div>
        ) : (
          <div key="cd">
            <h2>
              Okay we sent you an email! What was the code?
            </h2>
            <div>
              <input
                type="text"
                placeholder="Code plz"
                value={code || ""}
                onChange={(e) => setState({ ...state, code: e.target.value })}
              />
            </div>
            <button
              onClick={(e) => {
                auth
                  .verifyMagicCode({ email: sentEmail, code })
                  .catch((err: any) => {
                    alert("Uh oh :" + err.body?.message);
                    setState({ ...state, code: "" });
                  });
              }}>
              Verify
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 5. Make queries to your heart's content!
// Checkout InstaQL for examples
// https://paper.dropbox.com/doc/InstaQL--BgBK88TTiSE9OV3a17iCwDjCAg-yVxntbv98aeAovazd9TNL
function Main() {
  // Starting out
  const data = useAdhocQuery({ goals: { todos: {} } });

  // Mature query
  const goals = useGetGoals() ?? [];
  const addTodos = useAddTodos([{id: id(), data: {title: "Go on a run"}}], id());

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button
        onClick={(e) => {
          const todoAId = id();
          const todoBId = id();

          // Starting out
          adhocTransact([
            tx.todos[todoAId].update({ title: "Go on a run" }),
            tx.todos[todoBId].update({
              title: "Drink a protein shake",
            }),
            tx.goals[id()]
              .update({ title: "Get fit!" })
              .link({ todos: todoAId })
              .link({ todos: todoBId }),
          ]);
        }}>
        Create some example data
      </button>
    </div>
  );
}

export default App;