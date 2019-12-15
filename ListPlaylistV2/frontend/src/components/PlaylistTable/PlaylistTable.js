import React from 'react';
import './PlaylistTable.css';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getColumns } from "./utils/constants";
import { data } from './utils/mockData';

class PlaylistTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			playlists, source
		} = this.props;

		const columns = getColumns(source);

		return (
			<Table
				pagination={false}
				scroll={{ y: 349 }}
				className="spotify-table"
				// rowSelection={rowSelection}
				columns={columns}
				dataSource={playlists}
				rowClassName={(record, index) =>
					index < 0 ? 'your-class-name' : 'margin-top-20'
				}
				// onHeaderRow={(record, index) =>
				// 	index === 0 ? 'your-class-name' : 'first-row'
				// }
			/>
		);
	}

};

const mapStateToProps = (state) => ({
	playlists: state.playlists.playlists,
	source: state.playlists.source,
});

export default connect(mapStateToProps)(PlaylistTable);
