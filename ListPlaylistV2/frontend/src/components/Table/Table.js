import React from 'react';
import './Table.css';
import { Table } from 'antd';
// import logo from './../../assets/images/spotify-logo.svg';
import axios from 'axios';

const me = 'nzwazeib4qbxbmx6p1xajlxei';
const user_id = me;
var token =
	'Bearer BQAfHx28I8YrUHXB7KBoheJUzOXuFMDCcqXwbRLFtZ6iCcpTtZqh3_6G4Tzc1xEL3UXUcO_IoNoGdvaUP-1ON_tNB26aJMFQ-qpB_6lEplb9XCjPQckXazFiYJkWasZR3CRFXNNRjn-BuC23FOWVlDSgtfAl68EUjVfVXFkzTTG3CzY';
var request = require('request');
var playlist_url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
var test_url = 'https://jsonplaceholder.typicode.com/todos';

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
function getPlaylists() {
	axios({
		method: 'get',
		url: test_url
	})
		.then(res => console.log(res))
		.catch(err => console.log(err));
}

// //User_id gaunam kaip prop
// fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
// 	headers: {
// 		Authorization: 'Bearer ' + accessToken
// 	}
// 	//returns response as json
// })
// 	.then(response => response.json())
// 	.then(data => this.setState);

//This should be retrieved from the api
const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		render: text => <a>{text}</a>
	},
	{
		title: 'Age',
		dataIndex: 'age'
	},
	{
		title: 'Address',
		dataIndex: 'address'
	}
];
const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park'
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park'
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park'
	},
	{
		key: '4',
		name: 'Disabled User',
		age: 99,
		address: 'Sidney No. 1 Lake Park'
	},
	{
		key: '5',
		name: 'Disabled User',
		age: 99,
		address: 'Sidney No. 1 Lake Park'
	},
	{
		key: '6',
		name: 'Disabled User',
		age: 99,
		address: 'Sidney No. 1 Lake Park'
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
		disabled: record.name === 'Disabled User', // Column configuration not to be checked
		name: record.name
	})
};

export const spotifyTable = () => (
	<Table
		className="spotify-table"
		rowSelection={rowSelection}
		columns={columns}
		dataSource={data}
	/>
);

export default spotifyTable;
