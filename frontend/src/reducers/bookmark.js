const initialState = {
  bookmarks: [],
  loading: true,
  error: {},
};

export default function bookmark(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_BOOKMARKS":
      return {
        ...state,
        bookmarks: payload,
        loading: false,
      };
    case "BOOKMARK_ERROR":
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
