import React, { forwardRef } from 'react';
import {
  Button, Grid, Dialog, DialogContent, DialogTitle, Typography, TextField, IconButton,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

import { TableIcons } from './TableIcons';
import { FreeBoard } from '../shared/interfaces/freeBoard.interface';
import useBasicDialog from '../../../utils/hooks/useBasicDialog';
import AddDialog from './AddDialog';
import { FreeBoardPost } from '../../../../../server/src/shared/dto/freeBoardPost.dto';
import ViewDialog from './ViewDialog';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    color: 'black',
  },
  dialogContent: {
    minHeight: 900,
    minWidth: 900,
  },
});

export interface FreeBoardTableProps {
  freeBoardData: FreeBoard[];
  handleGetFreeBoardData: () => void;
}

export default function FreeBoardTable(props: FreeBoardTableProps): JSX.Element {
  const { freeBoardData,handleGetFreeBoardData } = props;
  const classes = useStyles();

  const addDialog = useBasicDialog();
  const viewDialog = useBasicDialog();

  const [selectedContent, setSelectedContent] = React.useState<FreeBoard>(freeBoardData[0]);
  const handleSelectTableRow = (rowData: FreeBoard) => {
    setSelectedContent(rowData);
  };

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justify="flex-start"
    >
      <Grid item xs={9}>
        <MaterialTable
          title={(
            <Button
              variant="outlined"
              color="primary"
              style={{ fontWeight: 'bold' }}
              onClick={addDialog.handleOpen}
            >
              작성하기
            </Button>
          )}
          icons={TableIcons}
          columns={[
            {
              title: '',
              field: '_index',
              cellStyle: { width: 10, fontWeight: 'bold' },
              headerStyle: { width: 10, fontWeight: 'bold' },
              align: 'center',
            },
            {
              title: '카테고리',
              field: 'category',
              cellStyle: { width: 50 },
              headerStyle: { width: 50, fontWeight: 'bold' },
            },
            {
              title: '태그',
              field: 'tag',
              cellStyle: { width: 50 },
              headerStyle: { width: 50, fontWeight: 'bold' },
            },
            {
              title: '제목', field: 'title', cellStyle: { width: 900 }, headerStyle: { width: 900, fontWeight: 'bold' },
            },
            {
              title: '작성자', field: 'userId', cellStyle: { width: 50 }, headerStyle: { width: 50, fontWeight: 'bold' },
            },
            {
              title: '작성일',
              field: 'createdAt',
              cellStyle: { width: 70 },
              headerStyle: { width: 70, fontWeight: 'bold' },
              render: (rowData) => (<div>{moment(rowData.createdAt).format('YYYY-MM-DD')}</div>),
            },
            {
              title: '조회수',
              field: 'views',
              cellStyle: { maxWidth: '10px' },
              headerStyle: { maxWidth: '10px', fontWeight: 'bold' },
              align: 'center',
            },
            {
              title: '좋아요',
              field: 'likes',
              cellStyle: { maxWidth: '10px' },
              headerStyle: { maxWidth: '10px', fontWeight: 'bold' },
              align: 'center',
            },
          ]}
          data={freeBoardData}
          options={{
            search: true,
          }}
          onRowClick={(e, rowData) => {
            if (rowData) {
              handleSelectTableRow(rowData);
              viewDialog.handleOpen();
            }
          }}
        />
        <AddDialog
          open={addDialog.open}
          handleClose={addDialog.handleClose}
          handleGetFreeBoardData={handleGetFreeBoardData}
        />

        <ViewDialog
          open={viewDialog.open}
          handleClose={viewDialog.handleClose}
          selectedContent={selectedContent}
          handleGetFreeBoardData={handleGetFreeBoardData}
        />
      </Grid>
    </Grid>
  );
}