const surveys = this.props.surveys;

const newDatedSurveys = surveys.map(item => {
   const newDate = new Date(item.date);
   return {
      ...item,
      dateSent: newDate,
   };
});

newDatedSurveys.sort((a, b) => b.dateSent - a.dateSent);
