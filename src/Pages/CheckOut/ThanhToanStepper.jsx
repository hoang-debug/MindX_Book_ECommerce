import { Step, StepLabel, Stepper } from "@material-ui/core"

const steps = ['Đăng nhập', 'Chọn địa chỉ', 'Thanh toán', 'Vận chuyển', 'Kết thúc']

const ThanhToanStepper = (props) => {
  return (
    <Stepper alternativeLabel activeStep={props.step}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

ThanhToanStepper.defaultProps = {
  step: 0
}

export default ThanhToanStepper