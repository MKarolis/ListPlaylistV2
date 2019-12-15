import React from 'react';
import './Table.css';
import { Table } from 'antd';
// import logo from './../../assets/images/spotify-logo.svg';
import axios from 'axios';
import spotifyLogo from './../../assets/images/spotify-yellow.svg';

var token =
	'Bearer BQAfHx28I8YrUHXB7KBoheJUzOXuFMDCcqXwbRLFtZ6iCcpTtZqh3_6G4Tzc1xEL3UXUcO_IoNoGdvaUP-1ON_tNB26aJMFQ-qpB_6lEplb9XCjPQckXazFiYJkWasZR3CRFXNNRjn-BuC23FOWVlDSgtfAl68EUjVfVXFkzTTG3CzY';
var request = require('request');

// export class SpotifyTable extends React.Component {
// 		state = {
// 			playlists: []
// 		};
// 	}
// 	componentDidMount() {
// 		axios.get(test_url).then(res => {
// 			//sets playlists to response data (whatever was returned from the url)
// 			console.log(this.playlists);
// 			this.setState({ playlists: res.data });
// 		});
// 	}

const columns = [
	{
		dataIndex: 'image',
		render: image => <img src={spotifyLogo} alt="spotify-logo" />,
		width: 80
	},
	{
		title: 'Song title ',
		dataIndex: 'name',
		width: 350
	},
	{
		title: 'Song count',
		dataIndex: 'songNum',
		width: 200
	},
	{
		title: 'Owner',
		dataIndex: 'owner'
	}
];

//This should be retrieved from the api "get user playlists" and passed to the component as a prop
const data = [
	{
		key: '1',
		image: 'John Brown',
		name: 'hey guys',
		songNum: 51,
		owner: 'Bobby Brown'
	},
	{
		key: '2',
		image: 'Jim Green',
		name: 'this is an edge case testing extremely lengthy playlist names',
		songNum: 32,
		owner: 'Bobby Brown'
	},
	{
		key: '3',
		image: 'Joe Black',
		name: 'a wave washes over me',
		songNum: 22,
		owner: 'Bobby Brown'
	},
	{
		key: '4',
		image: 'Disabled User',
		name: 'sungs',
		songNum: 42,
		owner: 'Bobby Brown'
	},
	{
		key: '5',
		image: 'Jim Green',
		name: 'Best playlist',
		songNum: 12,
		owner: 'Bobby Brown'
	},
	{
		key: '6',
		image: 'Disabled User',
		name: 'sungs',
		songNum: 42,
		owner: 'Bobby Brown'
	},
	{
		key: '7',
		image: 'Disabled User',
		name: 'sungs',
		songNum: 42,
		owner: 'Bobby Brown'
	},
	{
		key: '8',
		image: 'Disabled User',
		name: 'sungs',
		songNum: 42,
		owner: 'Bobby Brown'
	},
	{
		key: '9',
		image: 'Disabled User',
		name: 'sungs',
		songNum: 42,
		owner: 'Bobby Brown'
	}
];

// rowSelection object indicates the need for row selection
const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(
			`selectedRowKeys: ${selectedRowKeys}`,
			'selectedRows: ',
			selectedRows
		);
	},
	getCheckboxProps: record => ({
		name: record.name
	})
};

export const spotifyTable = () => (
	<Table
		pagination={false}
		scroll={{ y: 349 }}
		className="spotify-table"
		rowSelection={rowSelection}
		columns={columns}
		dataSource={data}
		rowClassName={(record, index) =>
			index < 0 ? 'your-class-name' : 'margin-top-20'
		}
		// onHeaderRow={(record, index) =>
		// 	index === 0 ? 'your-class-name' : 'first-row'
		// }
	/>
);

export default spotifyTable;
