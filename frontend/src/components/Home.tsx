import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Home() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบบันทึกการจ่ายยาผู้ป่วยใน</h1>
        <h4>Requirements</h4>
        <p>
        ระบบบันทึกการจ่ายยาผู้ป่วยในเป็นระบบที่ให้เภสัชกรสามารถบันทึกข้อมูลการจ่ายยาของผู้ป่วยในเพื่อสามารถจัดการการจัดยาและจ่ายยาได้อย่างมีประสิทธิภาพ ตรงตามใบบันทึกการรักษา และเพื่อไม่ให้ยาที่จ่ายเป็นยาที่อาจเกิดอันตรายต่อผู้ป่วยใน หรือเป็นยาที่ผู้ป่วยในมีอาการแพ้ โดยการใช้ระบบบันทึกการจ่ายยาผู้ป่วยในนั้น ทำได้โดยเมื่อเภสัชกรทำการจ่ายยาตามใบบันทึกการรักษา เภสัชกรจะต้องกรอกข้อมูลการจ่ายยาผู้ป่วยในลงในระบบด้วย เพื่อเป็นฐานข้อมูลบันทึกการจ่ายยาของผู้ป่วยใน และเพื่อที่จะได้ทราบข้อมูลตัวยาที่ผู้ป่วยในใช้ ซึ่งเมื่อระบบได้รับข้อมูลแล้ว ระบบจะบันทึกข้อมูลเป็นบันทึกการจ่ายยาเก็บไว้ โดยระบบนี้สามารถช่วยให้เภสัชกรตรวจสอบได้ว่าผู้ป่วยเคยได้รับยาอะไรมาแล้วบ้าง เพื่อนำไปให้แพทย์วิเคราะห์การรักษาได้ในอนาคต
        </p>
      </Container>
    </div>
  );
}
export default Home;