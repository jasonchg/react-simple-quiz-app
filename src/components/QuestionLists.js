import {
  Paper,
  Grid,
  makeStyles,
  Container,
  Button,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles({
  question: {
    padding: 20,
    background: '#eee',
    fontWeight: 'bold',
  },
  answer: {
    padding: 12,
    background: '#eee',
    width: '100%',
  },
  correct: {
    color: 'green',
  },
  wrong: {
    color: 'red',
  },
})

const QuestionLists = ({
  data: { question, correct_answer, answers },
  showCorrectAnswer,
  handleNext,
  handleAnswer,
}) => {
  const classes = useStyles()

  return (
    <Container maxWidth='sm'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.question}>
            <Typography>{question}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {answers.map((answer, i) => (
              <Grid item xs={6} key={i}>
                <Button
                  size='large'
                  className={`${classes.answer} 
                  
                  ${
                    showCorrectAnswer
                      ? answer === correct_answer
                        ? classes.correct
                        : classes.wrong
                      : ''
                  }`}
                  onClick={() => handleAnswer(answer)}
                >
                  {answer}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ textAlign: 'end' }}>
          <Button
            size='large'
            disabled={showCorrectAnswer ? false : true}
            onClick={handleNext}
          >
            Next Questions
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default QuestionLists
