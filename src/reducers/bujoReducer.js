import {
  journalTypes,
  habitTypes,
  accountTypes,
} from "../constants/actionTypes";

const initialState = {
  og_entries: [],
  entries: [],
  tags: [],
  showEntries: true,
  entryInfo: {
    title: "",
    content: "",
    id: -1,
    labels: "journal",
  },
  habitDate: {},
  habitList: [],
  habitEditMode: false,
  accountId: -1,
  jwt: "",
  verified: false,
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    //JOURNAL
    case journalTypes.GET_ENTRIES:
      return Object.assign({}, state, {
        og_entries: action.entries,
        entries: action.entries,
      });
    case journalTypes.TAGS:
      return Object.assign({}, state, {
        tags: action.tags,
      });
    case journalTypes.SORT_ENTRIES:
      return Object.assign({}, state, {
        og_entries: [...action.og_entries],
        entries: [...action.entries],
      });
    case journalTypes.FILTER_ENTRIES:
      return Object.assign({}, state, {
        entries: [...action.entries],
      });
    case journalTypes.DELETE:
      return Object.assign({}, state, {
        og_entries: action.entries,
        entries: state.entries.filter((item) => item.id !== action.deleted),
      });
    case journalTypes.CREATE:
      return Object.assign({}, state, {
        og_entries: action.entries,
        entries: [...state.entries, action.newEntry],
      });
    case journalTypes.SHOW_ENTRIES:
      return Object.assign({}, state, {
        showEntries: true,
      });
    case journalTypes.SHOW_FORM:
      return Object.assign({}, state, {
        showEntries: false,
        entryInfo: action.entry,
      });

    // HABITS
    case habitTypes.SET_HABITS:
      return Object.assign({}, state, {
        habitList: action.habitList,
      });
    case habitTypes.ADD_HABIT:
      return Object.assign({}, state, {
        habitList: [...state.habitList, action.entry],
      });
    case habitTypes.EDIT_HABIT:
      return Object.assign({}, state, {
        showHabits: false,
      });
    case habitTypes.SET_MODE:
      return Object.assign({}, state, {
        habitEditMode: action.mode,
      });
    case habitTypes.CURRENT_MONTH:
      return Object.assign({}, state, {
        habitDate: action.date,
      });

    case habitTypes.INCREMENT_MONTH:
      if (state.habitDate.month == 11) {
        return Object.assign({}, state, {
          habitDate: { month: 0, year: state.habitDate.year + 1 },
        });
      } else {
        return Object.assign({}, state, {
          habitDate: { ...state.habitDate, month: state.habitDate.month + 1 },
        });
      }
    case habitTypes.DECREMENT_MONTH:
      if (state.habitDate.month == 0) {
        return Object.assign({}, state, {
          habitDate: { month: 11, year: state.habitDate.year - 1 },
        });
      } else {
        return Object.assign({}, state, {
          habitDate: { ...state.habitDate, month: state.habitDate.month - 1 },
        });
      }

    // ACCOUNT
    case accountTypes.VERIFIED:
      console.log(action);
      return Object.assign({}, state, {
        accountId: action.id,
        jwt: action.jwt,
        verified: action.verified,
      });
    default:
      return state;
  }
};
