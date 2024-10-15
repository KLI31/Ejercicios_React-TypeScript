import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Form from "@/components/Form";
import TrackerList from "@/components/TrackerList";
import { useEffect, useReducer } from "react";
import { initialState, trackerReducer } from "./reducer/reducer";
import { Toaster } from "sonner";

function App() {
  const [state, dispatch] = useReducer(trackerReducer, initialState);

  useEffect(() => {
    localStorage.setItem("dataTracker", JSON.stringify(state.dataTracker));
  }, [state.dataTracker]);

  return (
    <>
      <Toaster />
      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="mb-6 shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl text-center font-bold">
              Tracker de Gastos Personales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form dispatch={dispatch} state={state} />
          </CardContent>
        </Card>
        <section>
          <Card className="mb-6 shadow-none">
            <CardHeader>
              <CardTitle className="text-3xl text-center font-bold">
                Lista de Gastos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TrackerList expenses={state?.dataTracker} dispatch={dispatch} />
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}

export default App;
