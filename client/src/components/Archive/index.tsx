import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { getAllOrders } from '../../store/archive/actions';
import { useDispatch } from 'react-redux';
import { iOrder } from '../../store/archive/types';

function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

type Order = 'asc' | 'desc';

function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

interface HeadRow {
  disablePadding: boolean;
  id: keyof iOrder;
  label: string;
  numeric: boolean;
}

const headRows: HeadRow[] = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Название' },
  { id: 'dateOrder', numeric: true, disablePadding: false, label: 'Принят' },
  { id: 'dateDeadline', numeric: true, disablePadding: false, label: 'Дедлайн' },
  { id: 'datePay', numeric: true, disablePadding: false, label: 'Дата оплаты' },
  { id: 'priceOrder', numeric: true, disablePadding: false, label: 'Цена' }
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof iOrder) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof iOrder) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}>
            <TableSortLabel active={orderBy === row.id} direction={order} onClick={createSortHandler(row.id)}>
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;
  return (
    <Toolbar>
      <div> {numSelected > 0 ? <span>{numSelected} selected </span> : <span> Nutrition </span>}</div>
      <div>
        {numSelected > 0 ? (
          <Tooltip title='Delete'>
            <IconButton aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title='Filter list'>
            <IconButton aria-label='filter list'>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

export default function Archive() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof iOrder>('title');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const rows = useSelector((state: State) => state.archive.data);
  console.log(rows);

  function handleRequestSort(event: React.MouseEvent<unknown>, property: keyof iOrder) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event: React.MouseEvent<unknown>, name: string) {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  }

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
      <Table aria-labelledby='tableTitle' size='medium'>
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <TableBody>
          {stableSort(rows, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row.title);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={event => handleClick(event, row.title)}
                  role='checkbox'
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.title}
                  selected={isItemSelected}>
                  <TableCell padding='checkbox'>
                    <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                  </TableCell>
                  <TableCell component='th' id={labelId} scope='row' padding='none'>
                    {row.title}
                  </TableCell>
                  <TableCell align='right'>{row.dateOrder}</TableCell>
                  <TableCell align='right'>{row.dateDeadline}</TableCell>
                  <TableCell align='right'>{row.datePay}</TableCell>
                  <TableCell align='right'>{row.priceOrder}</TableCell>
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 49 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page'
        }}
        nextIconButtonProps={{
          'aria-label': 'next page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
