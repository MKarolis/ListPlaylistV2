import spotifyLogo from "../../../assets/images/spotify-yellow.svg";
import youtubeLogo from "../../../assets/images/youtube-yellow.svg";
import React from "react";
import { PLAYLIST_SOURCE_SPOTIFY, PLAYLIST_SOURCE_YOUTUBE } from "../../../state/playlists/playlistsSources";

const columnsSpotify = [
    {
        dataIndex: 'imageUrl',
        render: imageUrl => <img src={imageUrl} width={80} alt="spotify-logo" />,
    },
    {
        title: 'Playlist title',
        dataIndex: 'title'
    },
    {
        title: 'Song count',
        dataIndex: 'songCount'
    },
    {
        title: 'Owner',
        dataIndex: 'owner'
    }
];

const columnsYoutube = [
    {
        dataIndex: 'image',
        render: image => <img src={youtubeLogo} alt="youtube-logo" />,
        width: 80
    },
    {
        title: 'Video name',
        dataIndex: 'name'
    },
];

const rowSelectionSpotify = {

};

const rowSelectionYoutube = {

};

export const getColumns = (source) => {
    switch (source) {
        case PLAYLIST_SOURCE_SPOTIFY:
            return columnsSpotify;
        case PLAYLIST_SOURCE_YOUTUBE:
            return columnsYoutube;
        default:
            return null;
    }
};

export const getRowSelection = (source) => {
    switch (source) {
        case PLAYLIST_SOURCE_SPOTIFY:
            return rowSelectionSpotify;
        case PLAYLIST_SOURCE_YOUTUBE:
            return rowSelectionYoutube;
        default:
            return null;
    }
};
