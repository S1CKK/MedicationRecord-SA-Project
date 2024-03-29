import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { MedRecordInterface } from "../models/IMedRecord";
import { format } from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
      minWidth: 1200,
    },
    table: {
      minWidth: 1100,
    },
    tableSpace: {
      marginTop: 20,
    },
    
  })
);

function MedRecs() {
  const classes = useStyles();
  const [medRecords, setMedRecords] = useState<MedRecordInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getMedRecords = async () => {
    fetch(`${apiUrl}/route/ListMedRec`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setMedRecords(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getMedRecords();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              style={{color:"black"}}
              gutterBottom
            >
              ข้อมูลการจ่ายยา
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              style={{backgroundColor:"#626567"}}
              to="/medication_record/create"
              variant="contained"
              color="primary"
            >
              สร้างบันทึกการจ่ายยา
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="20%">
                  ผู้จ่ายยา
                </TableCell>
                <TableCell align="center" width="20%">
                  ใบบันทึกการรักษา
                </TableCell>
                <TableCell align="center" width="20%">
                  ยาที่จ่าย
                </TableCell>
                <TableCell align="center" width="5%">
                  จำนวน
                </TableCell>
                <TableCell align="center" width="25%">
                  วันที่และเวลา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medRecords.map((item: MedRecordInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Pharma.Name}</TableCell>
                  <TableCell align="center">{item.TreatmentID}  {item.Treatment.Admission.PatientID} {item.Treatment.Admission.PatientName}</TableCell>
                  <TableCell align="center">{item.Med.Med_name}</TableCell>
                  <TableCell align="center">{item.Amount}</TableCell>
                  <TableCell align="center">{format((new Date(item.RecordTime)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default MedRecs;