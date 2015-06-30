'use strict';

angular.module('risevision.schedulesApp.services')
  .constant('TYPE_URL', 'url')
  .constant('TYPE_PRESENTATION', 'presentation')
  .factory('playlistFactory', ['scheduleFactory', 'TYPE_URL', 
    'TYPE_PRESENTATION',
    function (scheduleFactory, TYPE_URL, TYPE_PRESENTATION) {
      var DEFAULT_DURATION = 10;
      var factory = {};

      factory.getNewPresentationItem = function() {
        return {
          duration: DEFAULT_DURATION,
          type: TYPE_PRESENTATION
        };
      };

      factory.getNewUrlItem = function() {
        return {
          duration: DEFAULT_DURATION,
          type: TYPE_URL,
          name: 'URL Item'
        };
      };

      var _getPlaylist = function () {
        return scheduleFactory.schedule.content;
      };

      var _getItemIndex = function (playlistItem) {
        return _getPlaylist() ? _getPlaylist().indexOf(playlistItem) : -1;
      };
      
      factory.isNew = function (playlistItem) {
        return _getItemIndex(playlistItem) === -1;
      };

      factory.updatePlaylistItem = function (playlistItem) {
        if (_getItemIndex(playlistItem) === -1) {
          _getPlaylist().push(playlistItem);
        }
      };

      factory.removePlaylistItem = function (playlistItem) {
        var index = _getItemIndex(playlistItem);
        if (index !== -1) {
          _getPlaylist().splice(index, 1);
        }
      };

      factory.canPlaylistItemMoveDown = function (playlistItem) {
        var index = _getItemIndex(playlistItem);

        return index > -1 && index < _getPlaylist().length - 1;
      };

      factory.canPlaylistItemMoveUp = function (playlistItem) {
        return _getItemIndex(playlistItem) > 0;
      };

      var _moveItem = function (playlistItem, newIndex) {
        var index = _getItemIndex(playlistItem);

        _getPlaylist().splice(newIndex, 0, _getPlaylist().splice(index, 1)[
          0]);
      };

      factory.movePlaylistItemDown = function (playlistItem) {
        if (factory.canPlaylistItemMoveDown(playlistItem)) {
          _moveItem(playlistItem, _getItemIndex(playlistItem) + 1);
        }
      };

      factory.movePlaylistItemUp = function (playlistItem) {
        if (factory.canPlaylistItemMoveUp(playlistItem)) {
          _moveItem(playlistItem, _getItemIndex(playlistItem) - 1);
        }
      };

      return factory;
    }
  ]);
