import React from 'react';
import './PlaylistTable.css';
import Media from 'react-media';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getColumns } from './utils/constants';
import { setSelectedPlaylist } from '../../state/playlists/playlistsActions';

class PlaylistTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { playlists, source, setSelectedPlaylist } = this.props;

		let key = 0;
		playlists.map(playlist => {
			key++;
			return {
				...playlist,
				key
			};
		});

		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(
					`selectedRowKeys: ${selectedRowKeys}`,
					'selectedRows: ',
					selectedRows
				);
				setSelectedPlaylist(selectedRows[0]);
			},
			getCheckboxProps: record => ({
				name: record.name
			}),
			type: 'radio'
		};

		const columns = getColumns(source);

		const getResponsiveColumns = smallScreen =>
			columns.filter(
				({ hideOnSmall = false }) => !(smallScreen && hideOnSmall)
			);

		return (
			<Media query="(max-width: 700px)">
				{smallScreen => {
					return (
						<Table
							pagination={false}
							scroll={{ y: 349 }}
							className="spotify-table"
							rowSelection={rowSelection}
							columns={getResponsiveColumns(smallScreen)}
							dataSource={playlists}
							rowClassName={(record, index) =>
								index < 0 ? 'your-class-name' : 'margin-top-20'
							}
							// onHeaderRow={(record, index) =>
							// 	index === 0 ? 'your-class-name' : 'first-row'
							// }
						/>
					);
				}}
			</Media>
		);
	}
}

const mapStateToProps = state => ({
	playlists: state.playlists.playlists,
	source: state.playlists.source,
	selectedPlaylist: state.playlists.selectedPlaylist
});

const mapDispatchToProps = dispatch => ({
	setSelectedPlaylist: playlist => dispatch(setSelectedPlaylist(playlist))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTable);
