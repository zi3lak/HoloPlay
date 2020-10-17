import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import callApi from '../utils/callApi';
import { ApiRoutes } from '../constants';
import { actions } from '../store';
import { Playlist } from '../types';
import { useState } from 'react';
import useStore from './useStore';
import { useTranslation } from 'react-i18next';

const usePlaylist = (): void => {
  const store = useStore();
  const { t } = useTranslation();

  const createPlaylist = async (
    playlist: Playlist,
    callback: () => void,
    showFlashMessage: boolean = true
  ): Promise<any> => {
    const playlistName = playlist.title;

    try {
      if (!store.logoutMode) {
        await callApi({
          url: ApiRoutes.Playlists,
          method: 'POST',
          body: {
            title: playlist.title,
            privacy: 'public'
          }
        });
      }

      actions.addPlaylist({
        playlistId: playlist.playlistId ?? uuidv4(),
        title: playlist.title,
        privacy: 'public',
        videos: []
      });
    } catch (error) {
      console.log(error);
      actions.setFlashMessage({
        message: t('flashMessage.removePlaylist', {
          playlistName: error.message
        })
      });
    }

    if (callback) {
      callback();
    }

    if (showFlashMessage) {
      return setTimeout(
        () =>
          actions.setFlashMessage({
            message: t('flashMessage.createPlaylist', { playlistName })
          }),
        500
      );
    } else {
      return null;
    }
  };

  const updatePlaylist = async (
    playlist: Playlist,
    callback: () => void
  ): Promise<any> => {
    try {
      // Updating store before because this callApi return an error if success ...
      actions.updatePlaylist({
        ...playlist,
        title: playlist.title
      });
      actions.setFlashMessage({
        message: t('flashMessage.updatePlaylist', {
          playlistName: playlist.title
        })
      });

      if (!store.logoutMode) {
        await callApi({
          url: ApiRoutes.PlaylistId(playlist.playlistId),
          method: 'PATCH',
          body: {
            title: playlist.title,
            privacy: 'public'
          }
        });
      }
    } catch (error) {
      console.log(error);
      actions.setFlashMessage({
        message: t('flashMessage.removePlaylist', {
          playlistName: error.message
        })
      });
      // actions.setFlashMessage({message: `Error : ${playlist.title} not updated.`});
    } finally {
      if (callback) {
        callback();
      }
    }
  };

  const removePlaylist = async (
    playlist: Playlist,
    callback: () => void
  ): Promise<any> => {
    try {
      // Updating store before because this callApi return an error if success ...
      actions.removePlaylist(playlist.playlistId);
      actions.setFlashMessage({
        message: t('flashMessage.removePlaylist', {
          playlistName: playlist.title
        })
      });

      if (!store.logoutMode) {
        await callApi({
          url: ApiRoutes.PlaylistId(playlist.playlistId),
          method: 'DELETE'
        });
      }
    } catch (error) {
      actions.setFlashMessage({
        message: t('flashMessage.removePlaylist', {
          playlistName: error.message
        })
      });
    } finally {
      if (callback) {
        callback();
      }
    }
  };

  return {
    createPlaylist,
    updatePlaylist,
    removePlaylist
  };
};

export default usePlaylist;
