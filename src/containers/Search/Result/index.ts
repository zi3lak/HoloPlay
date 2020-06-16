import { connect, Store } from '../../../store';
import SearchResult from '../../../components/Search/Result';

const SearchResultContainer = connect(
  ({ searchValue, playlists, searchType, favorisPlaylist }: Store) => ({
    searchValue,
    playlists,
    searchType,
    favorisPlaylist
  })
)(SearchResult);

export default SearchResultContainer;
