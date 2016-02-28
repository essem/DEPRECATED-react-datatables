import React from 'react';
import $ from 'jquery';
import 'datatables.net-bs';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/datatables.net-bs/css/dataTables.bootstrap.css';

export default class DataTable extends React.Component
{
  static propTypes = {
    data: React.PropTypes.array,
    columns: React.PropTypes.array,
    onRowClick: React.PropTypes.func,
  };

  componentDidMount() {
    const table = this.refs.table;

    const dt = $(table).DataTable({ // eslint-disable-line new-cap
      data: this.props.data,
      columns: this.props.columns,
    });

    const _this = this;
    $(table, 'tbody').on('click', 'tr', function onTrClick() {
      if ($(this).hasClass('warning')) {
        $(this).removeClass('warning');
      } else {
        $(table).find('tr.warning').removeClass('warning');
        $(this).addClass('warning');
      }

      const data = dt.row(this).data();
      _this.props.onRowClick(data);
    });
  }

  componentDidUpdate() {
    const table = this.refs.table;
    const dt = $(table).dataTable().api();
    dt.clear();
    dt.rows.add(this.props.data);
    dt.draw();
  }

  render() {
    return (
      <table
        ref="table"
        className="table table-striped table-bordered"
        width="100%"
      />
    );
  }
}
