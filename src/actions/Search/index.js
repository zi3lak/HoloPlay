import YoutubeSearch from '../../utils/youtubeSearch';

const searchState = {
  value: null,
  results: []
};

const searchActions = {
  setSearchValue: async (state, actions, value) => {
    return { ...state, value };
  },
  search: async (state, actions, value) => {
    await actions.setIsSearching();
    const results = await YoutubeSearch(value);
    return { ...state, results };
  }
};

export { searchActions, searchState };
