// const PLAYERS_TEAM_DATA_API = [
//     {
//         Key: 'BOS',
//         FILE: './players/boston.js',    
//     },
// ];

function getPlayersDataApi(params) {
    let file;
    
    switch (params) {
        case 'BOS':
            file = 'players/boston.js';
            break;
    
        default:
            break;
    }

    return file;
}

module.exports.getPlayersDataApi = getPlayersDataApi;