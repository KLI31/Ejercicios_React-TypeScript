import { DataTracker } from "@/types";

export type TrackerActions =
  | {
      type: "save-tracker";
      payload: { newData: DataTracker };
    }
  | {
      type: "delete-tracker";
      payload: { id: DataTracker["id"] };
    }
  | {
      type: "reset-tracker";
    };

export type TrackerState = {
  dataTracker: DataTracker[];
};

const getDataTracker = () => {
  const savedDataString = localStorage.getItem("dataTracker");
  return savedDataString ? JSON.parse(savedDataString) : [];
};

export const initialState: TrackerState = {
  dataTracker: getDataTracker(),
};

export const trackerReducer = (
  state: TrackerState = initialState,
  action: TrackerActions
) => {
  if (action.type === "save-tracker") {
    return {
      ...state,
      dataTracker: [...state.dataTracker, action.payload.newData],
    };
  }

  if (action.type === "delete-tracker") {
    let newData = [...state.dataTracker];
    newData = newData.filter((item) => item.id !== action.payload.id);
    return {
      ...state,
      dataTracker: newData,
    };
  }

  if (action.type === "reset-tracker") {
    return {
      dataTracker: [],
    };
  }
  return state;
};
