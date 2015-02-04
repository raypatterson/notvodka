var Enum = {
  RouteType: {
    GAME_FIELD: '/game/field',
    GAME_PODIUM: '/game/podium',
    GAME_PLAYER: '/player/',
  },
  MatchType: {
    DEFAULT: '/',
    WILDCARD: '*',
    GAME_FIELD: '/game/field*',
    GAME_PODIUM: '/game/podium*',
    GAME_PLAYER: '*/player/:id'
  }
};

module.exports = Enum;