import React from 'react';
import './Table.css';
import { Table } from 'antd';
// import logo from './../../assets/images/spotify-logo.svg';

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
