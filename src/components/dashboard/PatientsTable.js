import MessageIcon from "@mui/icons-material/Message";
import { Badge, Chip } from "@mui/material";
import React from "react";
import { Button, Pagination, Popover, Table, Whisper } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const ActionCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell
      {...props}
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        maxWidth: "60%",
      }}
    >
      <Chip
        clickable
        label="Quick View"
        variant="outlined"
        color="secondary"
      ></Chip>
      <Chip
        clickable
        icon={
          <Badge color="error" variant="dot">
            <MessageIcon fontSize="small" />
          </Badge>
        }
        label="Messages"
        color="secondary"
        variant="outlined"
      ></Chip>
      <Chip clickable label="Goals" variant="outlined" color="secondary"></Chip>
      <Chip clickable label="View" variant="outlined" color="secondary"></Chip>
    </Cell>
  );
};

const NameCell = ({ rowData, dataKey, ...props }) => {
  const speaker = (
    <Popover title="Description">
      <p>
        <b>Age:</b> {rowData.age}
      </p>
      <p>
        <b>Sex:</b> {rowData.sex}
      </p>
      <p>
        <b>Status:</b> {rowData.status}
      </p>
      <p>
        <b>Diagnosis:</b> {rowData.diagnosis}
      </p>
    </Popover>
  );

  return (
    <Cell {...props}>
      <Whisper placement="top" speaker={speaker}>
        <Button appearance="link">{rowData[dataKey]}</Button>
      </Whisper>
    </Cell>
  );
};

const PatientsTable = ({ patientsData }) => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = patientsData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  return (
    <>
      <Table autoHeight data={data} hover>
        <Column width={160} resizable>
          <HeaderCell>Patient Name</HeaderCell>
          <NameCell dataKey="patientName" />
        </Column>

        <Column width={100}>
          <HeaderCell>Age</HeaderCell>
          <Cell dataKey="age" />
        </Column>

        <Column width={100}>
          <HeaderCell>Sex</HeaderCell>
          <Cell dataKey="sex" />
        </Column>

        <Column width={160} resizable>
          <HeaderCell>Physical Therapist</HeaderCell>
          <Cell dataKey="therapistName" />
        </Column>

        <Column width={160}>
          <HeaderCell>Status</HeaderCell>
          <Cell dataKey="status" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Diagnosis</HeaderCell>
          <Cell dataKey="diagnosis" />
        </Column>

        <Column width={1000} resizable>
          <HeaderCell>Actions</HeaderCell>
          <ActionCell dataKey="actions" />
        </Column>
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={patientsData.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </>
  );
};

export default PatientsTable;
