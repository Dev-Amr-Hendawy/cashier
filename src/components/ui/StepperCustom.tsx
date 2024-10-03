import { Step, StepConnector, stepConnectorClasses, StepIconProps, StepLabel, Stepper, styled } from '@mui/material';

const classesLabel = {
  ".Mui-completed": { color: 'var(--primary-main)  !important', mt: "0px !important" }, ".Mui-active": { color: 'var(--primary-main) !important' }, ".Mui-disabled": { color: '#9CA3AF !important' },
  ".MuiStepLabel-label": { mt: "0px !important" }, fontSize: "0.75rem",
  fontWeight: 600
  // ,whiteSpace:"nowrap" 

}


type Props = {
  steps?: string[];
  activeStep?: number;
};

const StepperCustom = ({ steps, activeStep }: Props) => {

  return (
    <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />} sx={{ width: "clamp(25rem, 50vw, 70rem)" }}>
      {steps?.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={QontoStepIcon} sx={classesLabel}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}



export default StepperCustom



const QontoConnector = styled(StepConnector)(({ theme }) => ({
  // width:"9.375rem",

  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',

  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'var(--primary-main)',
      borderWidth: 3,
      borderRadius: 1,
    },

  },
  [`&.${stepConnectorClasses.completed}`]: {
    color: 'var(--primary-main) !important',
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
      borderWidth: 3,
      borderRadius: 1,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#9CA3AF",
    borderTopWidth: 3,
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      borderColor: theme.palette.grey[200],
    }),
  },
}));
const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean; completed?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: '#9CA3AF',
    display: 'flex',
    position: 'relative',
    top: '-0.5rem',
    height: '2.2rem',
    width: '2.2rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#9CA3AF",
    borderWidth: ownerState.completed ? '0px' : '4px', // Change border width to 0 when completed
    borderStyle: 'solid',
    borderRadius: '9999rem',
    zIndex: 3,
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: ownerState.active ? theme.palette.primary.main : "#9CA3AF",
    },

    ...theme.applyStyles('dark', {
      color: theme.palette.grey[700],
    }),

    variants: [
      {
        props: ({ ownerState }) => ownerState.active,
        style: {
          color: 'var(--primary-main)',
          borderColor: theme.palette.primary.main,
        },
      },
    ],
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active, completed }} className={className}>
      {completed ? (
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16.5" cy="16" r="16" fill="#232773" />
          <path
            d="M10.667 16.8335L14.0003 20.1668L22.3337 11.8335"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}