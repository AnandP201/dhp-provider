import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SearchIcon from "@rsuite/icons/Search";
import React, { useEffect, useState } from "react";
import { CheckPicker, DatePicker, Input, InputGroup } from "rsuite";
import { mockUsers } from "../components/dashboard/mock_data";
import PatientsTable from "../components/dashboard/PatientsTable";

const filter_options = [
  { label: "Patient Name", value: "patientName" },
  { label: "Therapist Name", value: "therapistName" },
  { label: "Diagnosis", value: "diagnosis" },
  { label: "Status", value: "status" },
];

const CustomInputGroupWidthButton = ({ placeholder, ...props }) => (
  <InputGroup {...props} inside>
    <Input placeholder={placeholder} />
    <InputGroup.Button>
      <SearchIcon />
    </InputGroup.Button>
  </InputGroup>
);

const GraphCard = () => (
  <Card
    sx={{ backgroundColor: "GrayText" }}
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "200px",
      height: "100%",
    }}
  >
    <Typography fontSize={20} color="white">
      Graph
    </Typography>
  </Card>
);

const Dashboard = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [patientsData, setPatientsData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (
      selectedFilters.length === 0 ||
      patientsData.length === 0 ||
      query === ""
    ) {
      setFilteredData(patientsData);
      return;
    }

    setFilteredData(
      patientsData.filter((p) => {
        let flag = false;

        selectedFilters.forEach((fil) => {
          if (p[fil].toLowerCase().includes(query.toLowerCase())) flag = true;
        });
        return flag;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, query]);

  useEffect(() => {
    let mock_data = mockUsers(50);
    setPatientsData(mock_data);
    setFilteredData(mock_data);
  }, []);

  return (
    <Stack sx={{ p: 2, width: "100%" }} spacing={5} alignItems="center">
      <Grid container width="100%" spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <GraphCard />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <GraphCard />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <GraphCard />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <GraphCard />
        </Grid>
      </Grid>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Stack direction={"row"} alignItems="center" spacing={3}>
          <Typography fontSize={20}>Patients</Typography>
          <DatePicker size="lg" defaultValue={new Date()} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <CheckPicker
            size="lg"
            data={filter_options}
            style={{ width: 224 }}
            placeholder="Filter by"
            onChange={(fil) => {
              setSelectedFilters(fil);
            }}
          />
          <CustomInputGroupWidthButton
            size="lg"
            placeholder="Search"
            onChange={(inp) => {
              setQuery(inp.target.value);
            }}
          />
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip clickable label="Clickable" color="primary" />
          <Chip
            clickable
            label="Clickable"
            color="primary"
            variant="outlined"
          />
          <Chip clickable label="Clickable" color="primary" />
          <Chip
            clickable
            label="Clickable"
            color="primary"
            variant="outlined"
          />
        </Stack>
      </Stack>
      <Box
        sx={{
          minHeight: "400px",
          width: "100%",
        }}
      >
        <PatientsTable patientsData={filteredData} />
      </Box>
    </Stack>
  );
};

export default Dashboard;
