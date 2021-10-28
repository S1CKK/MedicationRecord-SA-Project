import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { AdmissionInterface } from "../models/IAdmission";
import { MedicineInterface } from "../models/IMedicine";
import { PharmacistInterface } from "../models/IPharmacist";
import { TreatmentInterface } from "../models/ITreatment";
import { MedRecordInterface } from "../models/IMedRecord";
import { TextField } from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function MedRecCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [pharmacists, setPharmacists] = useState<PharmacistInterface>();
  const [medicines, setMedicines] = useState<MedicineInterface[]>([]);
  const [treatments, setTreatments] = useState<TreatmentInterface[]>([]);
  const [admissions, setAdmissions] = useState<AdmissionInterface[]>([]);
  //const [med, setMeds] = useState<MedRecordInterface[]>([]);
  const [medRecord, setMedRecord] = useState<Partial<MedRecordInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleInputChange = (

    event: React.ChangeEvent<{ id?: string; value: any }>
 
  ) => {
 
    const id = event.target.id as keyof typeof MedRecCreate;
 
    const { value } = event.target;
 
    setMedRecord({ ...medRecord, [id]: value });
 

  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof medRecord;
    setMedRecord({
      ...medRecord,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getPharmacist = async () => {
    const uid = Number(localStorage.getItem("uid"));
    fetch(`${apiUrl}/pharmacist/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPharmacists(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getMedicine = async () => {
    fetch(`${apiUrl}/medicines`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMedicines(res.data);
        } else {
          console.log("else");
        }
      });
  };
  /*
  const getTreatment = async () => {
    var tmpTreat =treatments;
    fetch(`${apiUrl}/treatment_records`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("Here is the treatment data");
          console.log(res.data);
          //setTreatments(res.data);
          tmpTreat = res.data;
        } else {
          console.log("else");
        }
      });
      fetch(`${apiUrl}/admissions`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if(res.data){
          console.log("here is a tmptreat");
          console.log(tmpTreat);
          var newTmp = tmpTreat.map((item,index) => {
            item.Admission = res.data[index];
            return item;
          });
          console.log("here is a newtmp");
          console.log(newTmp);
          setTreatments(newTmp);
        }else{
            console.log("error admission");
        }
      })
  };*/
  
  const getTreatment= async () => {
    fetch(`${apiUrl}/admission/treatments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTreatments(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getAdmission= async () => {
    fetch(`${apiUrl}/admissions`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setAdmissions(res.data);
        } else {
          console.log("else");
        }
      });
  };


/*
  const getAdmission = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/playlist/watched/user/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        watchVideo.PlaylistID = res.data.ID
        if (res.data) {
          setPlaylists(res.data);
        } else {
          console.log("else");
        }
      });
  };*/

  useEffect(() => {
    getPharmacist();
    getMedicine();
    getTreatment();
    getAdmission();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
 

  function submit() {
    let data = {
      PharmaID: convertType(pharmacists?.ID),
      TreatmentID: convertType(medRecord.TreatmentID),
      MedID: convertType(medRecord.MedID),
     // AdmissionID: convertType(medRecord.AdmissionID),
      RecordTime: selectedDate,
      Amount:  convertType(medRecord.Amount ?? ""),
      AdmissionID: convertType(medRecord.Treatment?.Admission.PatientID),
    };

    console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/medication_records`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
        }
      });
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกการจ่ายยา
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ผู้จ่ายยา</p>
              <Select
                native
                disabled
                value={medRecord.PharmaID}
               // onChange={handleChange}
                /*inputProps={{
                  name: "PharmaID",
                }}*/
              >
                <option aria-label="None" value="">

                  {pharmacists?.Name}
                </option>

              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ใบบันทึกการรักษา</p>
              <Select
                native
                value={medRecord.TreatmentID}
                onChange={handleChange}
                inputProps={{
                  name: "TreatmentID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกใบบันทึกการรักษา
                </option>
               
                {treatments.map((item: TreatmentInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}   {item.Admission.PatientID}  {item.Admission.Patient_Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ยาที่จ่าย</p>
              <Select
                native
                value={medRecord.MedID}
                onChange={handleChange}
                inputProps={{
                  name: "MedID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกยาที่จ่าย
                </option>
                {medicines.map((item: MedicineInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>จำนวน</p>
            <TextField
              label="กรุณากรอกจำนวน"
              id="Amount"
              name="Amount"
              variant="outlined"
              type="string"
              size="medium"
              value={medRecord.Amount || ""}
              onChange={handleInputChange}
            />
          </FormControl>
          </Grid> {/*
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>test</p>
              <Select
                native
                value={medRecord.AdmissionID}
                onChange={handleChange}
                inputProps={{
                  name: "AdmissionID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณา test
                </option>
                {admissions.map((item: AdmissionInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.PatientID}  {item.Patient_Name}
                  </option>
                ))}
              </Select>
            </FormControl>
                </Grid>*/}
          {/*    field lock
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เพลย์ลิสต์</p>
              <Select
                native
                value={medRecord.AdmissionID}
                onChange={handleChange}
                disabled
                inputProps={{
                  name: "AdmissionID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเพลย์ลิสต์
                </option>
                <option value={medRecord?.ID} key={medRecord?.ID}>
                  {medRecord?.Admission?.Patient_Name}
                </option>

                
              </Select>
            </FormControl>
              </Grid> */}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="RecordTime"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label=""
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/medication_records"
              variant="contained"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" ,backgroundColor:"#626567" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default MedRecCreate;